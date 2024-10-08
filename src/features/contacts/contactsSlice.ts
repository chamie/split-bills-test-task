import { RootState } from "../../app/store";
import { ContactModel } from "../../types/contactModel";
import { createSlice, PayloadAction } from "../../app/rtkSane";

export type ContactsState = {
    /** list of all the contacts, should not be re-ordered as array index serves for ID */
    contacts: readonly ContactModel[],
}

const initialState: ContactsState = {
    contacts: [],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // For overwriting the entire list. Used in LS sync
        setContacts: (state, action: PayloadAction<readonly ContactModel[]>) => ({
            ...state,
            contacts: action.payload,
        }),
        // Adds a new contact
        addContact: (state, action: PayloadAction<ContactModel>) => ({
            ...state,
            contacts: [...state.contacts, action.payload],
        }),
        // Updates a contact by ID. The ContactModel itself doesn't contain an ID, the index in the array is sufficient
        // (we don't have any delete functionality) so the ID is passed separately.
        updateContact: (state, action: PayloadAction<{ contactUpdateData: ContactModel, id: number }>) => ({
            ...state,
            contacts: state.contacts.map((c, idx)  => idx === action.payload.id
                    ? {...c, name: action.payload.contactUpdateData.name}
                    : c,
            ),
        }),
    }
});

export const { addContact, setContacts, updateContact } = contactsSlice.actions;

export default contactsSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.contacts;
