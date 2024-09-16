import { AppThunk, RootState } from "../../app/store";
import * as Storage from "../../services/storageService";
import { BillCreateModel, BillDto } from "../../types/billModel";
import moment from 'moment';
import { createSlice, PayloadAction } from "../../app/rtkSane";

/** State of the Bills page and the data related to it */
export type BillsState = {
    bills: readonly BillDto[],
}

const initialState: BillsState = {
    bills: [],
}

export const billsSlice = createSlice({
    name: "bills",
    initialState,
    reducers: {
        /** Adds a new bill from a list of its participants */
        addBill: (state, action: PayloadAction<BillCreateModel>) => {
            const bill: BillDto = {
                ...action.payload,
                creationDate: new Date(),
                idsPaidOut: [],
                sum: 0,
                title: `Bill from ${moment().format('MMMM Do YYYY')}`,
                id: state.bills.length,
            };
            return {
                ...state,
                bills: [
                    ...state.bills,
                    bill,
                ]
            }
        },
        setBills: (state, action: PayloadAction<BillDto[]>) => ({
            ...state,
            bills: action.payload,
        }),
        setPaid: (state, action: PayloadAction<{ billId: number, contactId: number, shouldMarkPaid: boolean }>) => {
            const { billId, contactId, shouldMarkPaid: isPaid } = action.payload;

            return {
                ...state,
                bills: state.bills.map(bill =>
                    bill.id === billId
                        ? {
                            ...bill,
                            idsPaidOut: isPaid
                                ? [...bill.idsPaidOut, contactId]
                                : bill.idsPaidOut.filter(id => id !== contactId)
                        }
                        : bill
                )
            }
        },
        setBillPaid: (state, action: PayloadAction<number>) => {
            const billId = action.payload;

            return {
                ...state,
                bills: state.bills.map(bill => bill.id === billId
                    ? {
                        ...bill,
                        idsPaidOut: bill.contactIds
                    }
                    : bill
                )
            }
        },
        updateBill: (state, action: PayloadAction<BillDto>) => ({
            ...state,
            bills: state.bills.map(bill => bill.id === action.payload.id
                ? action.payload
                : bill),
        }),
    }
});

export const init = () => {
    billsSlice.actions.setBills(Storage.loadBills());
};

export const addBill =
    (bill: BillCreateModel, navigate: (path: string) => void): AppThunk =>
        (dispatch, getState) => {
            dispatch(billsSlice.actions.addBill(bill));
            navigate(`/${getState().bills.bills.slice(-1)[0].id}`);
        }

export const { setPaid, setBills, updateBill, setBillPaid } = billsSlice.actions;

export const selectBills = (state: RootState) => state.bills.bills;

export default billsSlice.reducer;