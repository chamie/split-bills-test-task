import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import * as Storage from "../../services/storageService";
import { BillCreateModel, BillDto } from "../../types/billModel";
import moment from 'moment';

export type BillsState = {
    bills: BillDto[],
}

const initialState: BillsState = {
    bills: [],
}

export const billsSlice = createSlice({
    name: "bills",
    initialState,
    reducers: {
        addBill: (state, action: PayloadAction<BillCreateModel>) => {
            const bill: BillDto = {
                ...action.payload,
                creationDate: new Date(),
                idsPaidOut: [],
                sum: 0,
                title: `Bill from ${moment().format('MMMM Do YYYY')}`,
                id: state.bills.length,
            };
            state.bills.push(bill);
        },
        setBills: (state, action: PayloadAction<BillDto[]>) => {
            state.bills = action.payload;
        },
        setPaid: (state, action: PayloadAction<{ billId: number, contactId: number, markPaid: boolean }>) => {
            const { billId, contactId, markPaid: isPaid } = action.payload;
            const bill = state.bills.find(b => b.id === billId);

            if (!bill) return;

            if (isPaid) {
                bill.idsPaidOut.push(contactId);
            } else {
                bill.idsPaidOut = bill.idsPaidOut.filter(x => x !== contactId);
            }
        },
        setBillPaid: (state, action: PayloadAction<number>) => {
            const billId = action.payload;
            const bill = state.bills.find(b => b.id === billId);

            if (!bill) return;

            bill.idsPaidOut = bill.peopleIds;
        },
        updateBill: (state, action: PayloadAction<BillDto>) => {
            const bill = action.payload;
            state.bills[bill.id] = bill;
        }
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