import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ContactModel } from "../../types/contactModel";

export type ContactsState = {
    contacts: ContactModel[],
}

const initialState: ContactsState = {
    contacts: [],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<ContactModel[]>) => {
            state.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<ContactModel>) => {
            state.contacts.push(action.payload);
        },
        updateContact: (state, action: PayloadAction<{ person: ContactModel, id: number }>) => {
            const { id, person } = action.payload;
            const contact = state.contacts[id];
            if (!contact)
                return;

            contact.name = person.name;
        }

    }
});

export const { addContact, setContacts, updateContact } = contactsSlice.actions;

export default contactsSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.contacts;
