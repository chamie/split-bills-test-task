import { ChangeEvent, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBillPaid, setPaid } from "../../features/bills/billsSlice";
import { selectContacts } from "../../features/contacts/contactsSlice";
import { BillDto } from "../../types/billModel";
import { Contact } from "../contact/Contact";
import { useNavigate } from "react-router-dom";

import styles from "./Bill.module.scss";
import moment from "moment";

type Props = BillDto & {
    onEdit?: (bill: BillDto) => void,
};

const classes = (classes: string[]) => classes.filter(x => x && x !== "").join(" ");

export const Bill = (props: Props) => {
    const { creationDate, idsPaidOut, contactIds, sum, title, id: billId, onEdit } = props;
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const splitSum = sum / (contactIds.length + 1); // don't forget yourself! You don't owe yourselft but so you're not in the list, but you still had your [fair] share of the treats.

    const paidOut = useMemo(() => new Set(idsPaidOut), [idsPaidOut]);

    const checkHandler = useCallback((id: number) => {
        dispatch(setPaid({ billId, contactId: id, markPaid: !paidOut.has(id) }));
    }, [dispatch, paidOut, billId]);

    const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onEdit && onEdit({ ...props, title: e.target.value });

    const sumChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onEdit && onEdit({ ...props, sum: parseInt(e.target.value) });

    const checkAllHandler = () => dispatch(setBillPaid(billId));

    const navigate = useNavigate();

    const isAllPaid = paidOut.size === contactIds.length;

    return (
        <div tabIndex={-1} aria-labelledby={`bill-${billId}-title`} className={classes([styles.Bill, onEdit ? styles.active : "", isAllPaid ? styles["paid-out"] : ""])}>
            <div className={styles["action-buttons-row"]}>
                {!isAllPaid && <button aria-label="Mark all persons as already paid" onClick={checkAllHandler}>✅mark paid</button>}
                {
                    onEdit
                        ? <button aria-label={`Submit changes to ${title} bill and quit editing mode`} onClick={() => { navigate(`/`) }} title="Done">✔️submit</button>
                        : <button aria-label="Edit the bill" onClick={() => { navigate(`/${billId}`) }} title="Edit">🖊️edit</button>
                }
            </div>
            <h4 id={`bill-${billId}-title`}>{
                onEdit
                    ? <input value={title} readOnly={!onEdit} onChange={titleChangeHandler} />
                    : title
            }</h4>
            <div>
                {
                    onEdit
                        ? <input type="number" value={sum} readOnly={!onEdit} size={3} onChange={sumChangeHandler} />
                        : sum
                } total, {Math.round(splitSum * 100) / 100} each.
            </div>
            <ul>
                {contactIds.map(contactId => {
                    const contact = contacts[contactId];
                    return <li key={contactId}>
                        <Contact
                            onNameClick={checkHandler}
                            onCheck={checkHandler}
                            id={contactId}
                            isChecked={paidOut.has(contactId)}
                            {...contact}
                        />
                    </li>
                })}
            </ul>
            <div className={styles.dateCreated}>Created {moment(creationDate).fromNow()}</div>
        </div>
    );
};