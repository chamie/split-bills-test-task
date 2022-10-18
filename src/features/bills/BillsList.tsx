import { Bill } from "../../components/bill/Bill";
import { Link } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { selectBills } from "./billsSlice";
import { useParams } from 'react-router-dom';

export const BillsList = () => {
    const { id } = useParams();
    const bills = useAppSelector(selectBills);
    return <div>
        <h3>
            Bills.
        </h3>
        {bills.length
            ? <div className="billsContainer">
                {bills.map(bill => <Bill {...bill} />)}
            </div>
            : <h4>No bills currently saved, you may start with creating one:</h4>
        }
        <Link to="/contacts">Create list.</Link>
    </div>;
}