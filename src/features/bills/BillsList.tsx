import { Bill } from "../../components/bill/Bill";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBills, updateBill } from "./billsSlice";
import { useParams } from 'react-router-dom';
import { BillDto } from "../../types/billModel";
import { useCallback } from "react";

import styles from "./BillsList.module.scss";
import { sortBy } from "../../utils/utils";

export const BillsList = () => {
    const activeBillId = parseInt(useParams().id || '');
    const bills = sortBy(useAppSelector(selectBills), "creationDate");
    const dispatch = useAppDispatch();
    const onEdit = useCallback((bill: BillDto) => dispatch(updateBill(bill)), [dispatch]);
    return <div>
        <h3>
            Bills
        </h3>
        {bills.length
            ? <div className={styles.billsContainer}>
                {bills.map(bill => <Bill {...bill} key={bill.id} onEdit={bill.id === activeBillId ? onEdit : undefined} />)}
            </div>
            : <h4>No bills currently saved, you may start with creating one:</h4>
        }
        <Link to="/contacts">Log another split bill...</Link>
    </div>;
}