import { useCallback, useEffect, useState } from "react";
import { ContactModel } from "../../types/contactModel";
import { Contact } from "../../components/contact/Contact";
import styles from './ContactList.module.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addContact, selectContacts } from "./contactsSlice";
import { addBill } from "../bills/billsSlice";
import { useNavigate } from 'react-router-dom';

type FilteredContactModel = ContactModel & {
    id: number,
}

export const ContactList = () => {
    const contacts = useAppSelector(selectContacts);
    const [checks, setChecks] = useState<Set<number>>(new Set());
    const [newName, setNewName] = useState("");

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
    const [filteredList, setFilteredList] = useState<FilteredContactModel[]>(
        contacts.map((x, id) =>
            ({ ...x, id })
        )
    );

    const applyFilter = (filterValue: string) =>
        setFilteredList(contacts
            .map((x, id) => ({ ...x, id }))
            .filter(c => c.name.toLocaleUpperCase().startsWith(filterValue.toUpperCase()))
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
                peopleIds: [...checks.keys()]
            }, navigate)
        );
    }, [checks, dispatch, navigate]);

    return (
        <div className={styles.ContactList}>
            <h3>Contacts:</h3>
            <input value={searchTerm} type={"search"} onChange={handleSearchChange} />
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
                        </li>
                    )
                }
            </ul>
            <div>{checks.size} of {contacts.length} selected.</div>
            <div>
                <button onClick={() => setChecks(new Set(contacts.map((_, id) => id)))}>Select All</button>
                <button disabled={!checks.size} onClick={() => setChecks(new Set())}>Deselect All</button>
            </div>
            <div>
                <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && addClickHandler()} />
                <button onClick={addClickHandler}>Add</button>
            </div>
            <div>
                <button onClick={handleAddBillClick}>Create split bill</button>
            </div>
        </div>)
}