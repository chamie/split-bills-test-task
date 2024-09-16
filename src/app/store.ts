import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Action, combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import billsReducer from '../features/bills/billsSlice'
import { loadBills, loadContacts } from '../services/storageService';
import contactsReducer from '../features/contacts/contactsSlice';
import * as StorageService from '../services/storageService';

const localStorageSyncMiddleware: ThunkMiddleware = ({ getState }) => (next) => (action: any) => {
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

const initialState = {
  bills: {
    bills: loadBills(),
  },
  contacts: {
    contacts: loadContacts(),
  }
};

const rootReducer = combineReducers({
  bills: billsReducer,
  contacts: contactsReducer,
});

const store = legacy_createStore(rootReducer, initialState, applyMiddleware(localStorageSyncMiddleware));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectAll = (state: RootState) => state;
