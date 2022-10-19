import { ChangeEvent, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPaid } from "../../features/bills/billsSlice";
import { selectContacts } from "../../features/contacts/contactsSlice";
import { BillDto } from "../../types/billModel";
import { Contact } from "../contact/Contact";
import { useNavigate } from "react-router-dom";

import styles from "./Bill.module.scss";

type Props = BillDto & {
    onEdit?: (bill: BillDto) => void,
};

const classes = (classes: string[]) => classes.filter(x => x && x !== "").join(" ");

export const Bill = (props: Props) => {
    const { creationDate, idsPaidOut, peopleIds, sum, title, id: billId, onEdit } = props;
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const splitSum = sum / peopleIds.length;

    const paidOut = useMemo(() => new Set(idsPaidOut), [idsPaidOut]);

    const checkHandler = useCallback((id: number) => {
        dispatch(setPaid({ billId, contactId: id, markPaid: !paidOut.has(id) }));
    }, [dispatch, paidOut, billId]);

    const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onEdit && onEdit({ ...props, title: e.target.value });

    const sumChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onEdit && onEdit({ ...props, sum: parseInt(e.target.value) });

    const navigate = useNavigate();

    return (
        <div className={classes([styles.Bill, onEdit ? styles.active : "", paidOut.size === peopleIds.length ? styles["paid-out"] : ""])}>
            <div className={styles["edit-save-icon"]}>
                {
                    onEdit
                        ? <button onClick={() => { navigate(`/`) }} title="Done">✔️</button>
                        : <button onClick={() => { navigate(`/${billId}`) }} title="Edit">🖊️</button>
                }
            </div>
            <h4>{
                onEdit
                    ? <input value={title} readOnly={!onEdit} onChange={titleChangeHandler} />
                    : title
            }</h4>
            {
                onEdit
                    ? <input type="number" value={sum} readOnly={!onEdit} size={3} onChange={sumChangeHandler} />
                    : sum
            } total, {Math.round(splitSum * 100) / 100} each.
            <ul>
                {peopleIds.map(personId => {
                    const person = contacts[personId];
                    return <li key={personId}>
                        <Contact
                            onNameClick={checkHandler}
                            onCheck={checkHandler}
                            id={personId}
                            isChecked={paidOut.has(personId)}
                            {...person}
                        />
                    </li>
                })}
            </ul>
            <div className={styles.dateCreated}>Created on {creationDate.toLocaleString()}</div>
        </div>
    );
};