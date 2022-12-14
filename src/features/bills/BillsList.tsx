import { Bill } from "../../components/bill/Bill";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBills, setBillPaid, setPaid, updateBill } from "./billsSlice";
import { useParams } from 'react-router-dom';
import { BillDto } from "../../types/billModel";
import { useCallback } from "react";

import styles from "./BillsList.module.scss";
import { sortBy } from "../../utils/utils";
import { selectContacts } from "../contacts/contactsSlice";

export const BillsList = () => {
    const activeBillId = parseInt(useParams().id || '');
    const bills = sortBy(useAppSelector(selectBills), "creationDate");
    const dispatch = useAppDispatch();
    const onEdit = useCallback((bill: BillDto) => dispatch(updateBill(bill)), [dispatch]);
    const contacts = useAppSelector(selectContacts);

    const onContactCheck = (billId: number) => (contactId: number, shouldMarkPaid: boolean) => {

        dispatch(setPaid({ billId, contactId, shouldMarkPaid }));
    }
    const onCheckAll = (billId: number) => dispatch(setBillPaid(billId));
    return <div>
        <h3>
            Bills.
        </h3>
        {bills.length
            ? <div className={styles.billsContainer}>
                {bills.map(bill =>
                    <Bill
                        {...bill}
                        contacts={contacts}
                        onCheckAll={onCheckAll}
                        key={bill.id}
                        onContactCheck={onContactCheck(bill.id)}
                        onEdit={bill.id === activeBillId ? onEdit : undefined}
                    />)}
            </div>
            : <h4>No bills currently saved, you may start with creating one:</h4>
        }
        To log another split bill select the participants in <Link to="/contacts">Contacts</Link>
    </div>;
}