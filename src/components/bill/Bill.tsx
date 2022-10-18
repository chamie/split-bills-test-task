import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPaid } from "../../features/bills/billsSlice";
import { selectContacts } from "../../features/contacts/contactsSlice";
import { BillDto } from "../../types/billModel";
import { Contact } from "../contact/Contact";

import styles from "./Bill.module.scss";

const nop = () => { };

export const Bill = (props: BillDto) => {
    const { creationDate, idsPaidOut, peopleIds, sum, title, id } = props;
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const splitSum = sum / peopleIds.length;

    const paidOut = useMemo(() => new Set(idsPaidOut), [idsPaidOut]);

    const checkHandler = useCallback((id: number) => {
        dispatch(setPaid({ billId: id, contactId: id, markPaid: !paidOut.has(id) }));
    }, [dispatch, paidOut]);

    return <div className={styles.Bill}>
        <h3>{title}</h3>
        {sum} total, {splitSum} each.
        <small>{creationDate.toLocaleString()}</small>
        <ul>
            {peopleIds.map(personId => {
                const person = contacts[personId];
                return <li key={personId}>
                    <Contact
                        onNameClick={nop}
                        onCheck={checkHandler}
                        id={personId}
                        isChecked={paidOut.has(personId)}
                        {...person}
                    />
                </li>
            })}
        </ul>

    </div>
};