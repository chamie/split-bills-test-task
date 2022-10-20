import { configureStore, ThunkAction, Action, ThunkMiddleware, AnyAction } from '@reduxjs/toolkit';
import billsReducer, { BillsState } from '../features/bills/billsSlice'
import { loadBills, loadContacts } from '../services/storageService';
import contactsReducer, { ContactsState } from '../features/contacts/contactsSlice';
import * as StorageService from '../services/storageService';

const lsSyncMiddleware: ThunkMiddleware<{
  bills: BillsState,
  contacts: ContactsState,
}, AnyAction, undefined> = ({ getState }) => (next) => (action) => {
  const state = getState();
  const result = next(action);
  const nextState = getState();
  if (action.type !== "contacts/setContacts" && action.type !== "bills/setBills") {
    if (state.bills !== nextState.bills) {
      StorageService.saveBills(nextState.bills.bills);
    } else {
      StorageService.saveContacts(nextState.contacts.contacts);
    }
  }
  return result;
}

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    contacts: contactsReducer,
  },
  preloadedState: {
    bills: {
      bills: loadBills(),
    },
    contacts: {
      contacts: loadContacts(),
    }

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(lsSyncMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectAll = (state: RootState) => state;
