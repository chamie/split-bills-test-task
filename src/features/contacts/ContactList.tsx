import { useCallback, useEffect, useState } from "react";
import { ContactModel } from "../../types/contactModel";
import { Contact } from "../../components/contact/Contact";
import styles from './ContactList.module.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addContact, selectContacts } from "./contactsSlice";
import { addBill, selectBills } from "../bills/billsSlice";
import { useNavigate } from 'react-router-dom';
import { moneyRound, sortBy } from "../../utils/utils";

type FilteredContactModel = ContactModel & {
    id: number,
}

type contactDetails = {
    totalDebt: number,
    totalBillsNotPaid: number,
    totalBills: number,
}

export const ContactList = () => {
    const contacts = useAppSelector(selectContacts);
    const [checks, setChecks] = useState<Set<number>>(new Set());
    const [newName, setNewName] = useState("");
    const [showDetails, setShowDetails] = useState(true);

    let details = new Map<number, contactDetails>();
    const bills = useAppSelector(selectBills);
    if (showDetails) {
        bills.forEach(bill => {
            const paid = new Set(bill.idsPaidOut);
            bill.contactIds.forEach(contactId => {
                const contact = details.get(contactId) || {
                    totalBills: 0,
                    totalBillsNotPaid: 0,
                    totalDebt: 0,
                };
                contact.totalBills++;
                if (!paid.has(contactId)) {
                    contact.totalBillsNotPaid++;
                    contact.totalDebt += bill.sum / (bill.contactIds.length + 1); // don't forget yourself! You don't owe yourselft but so you're not in the list, but you still had your [fair] share of the treats.
                }

                details.set(contactId, contact);
            });
        })
    }

    const checkHandler = useCallback((id: number) => {
        const newValue = new Set(checks);
        if (newValue.has(id)) {
            newValue.delete(id);
        } else {
            newValue.add(id);
        }
        setChecks(newValue);
    }, [checks]);

    const dispatch = useAppDispatch();

    const addClickHandler = useCallback(() => {
        dispatch(addContact({ name: newName }));
        setNewName("");
    }, [newName, dispatch]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredList, setFilteredList] = useState<FilteredContactModel[]>([]);

    const applyFilter = (filterValue: string) =>
        setFilteredList(
            sortBy(
                contacts
                    .map((x, id) =>
                        ({ ...x, id })
                    )
                    .filter(c => c.name.toLocaleUpperCase().startsWith(filterValue.toUpperCase())),
                x => x.name
            )
        );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        applyFilter(event.target.value);
    }

    useEffect(() => {
        applyFilter(searchTerm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts]);

    const navigate = useNavigate();

    const handleAddBillClick = useCallback(() => {
        dispatch(
            addBill({
                contactIds: Array.from(checks.keys())
            }, navigate)
        );
    }, [checks, dispatch, navigate]);

    return (
        <div className={styles.ContactList}>
            <h3>Contacts.</h3>
            Search: <input value={searchTerm} type={"search"} onChange={handleSearchChange} placeholder="Search..." title="Filter contacts" />
            <ul>
                {
                    filteredList.map(contact =>
                        <li key={contact.id}>
                            <Contact
                                isChecked={checks.has(contact.id)}
                                onCheck={checkHandler}
                                onNameClick={checkHandler}
                                {...contact}
                            />
                            {
                                showDetails &&
                                <small> (owes {moneyRound(details.get(contact.id)?.totalDebt || 0)} for {details.get(contact.id)?.totalBills} bills)</small>
                            }
                        </li>
                    )
                }
            </ul>
            <div>{checks.size} of {contacts.length} selected.</div>
            <div>
                <button onClick={() => setChecks(new Set([...checks, ...filteredList.map((x) => x.id)]))}>Select All Visible</button>
                <button disabled={!checks.size} onClick={() => setChecks(new Set())}>Deselect All</button>
                <label><input checked={showDetails} onChange={e=>setShowDetails(e.target.checked)} type="checkbox" />Show details</label>
            </div>
            <div>
                Add a new contact: 
                <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && addClickHandler()} />
                <button onClick={addClickHandler}>Add</button>
            </div>
            <div>
                <button onClick={handleAddBillClick}>Create new split bill</button>
            </div>
        </div>)
}