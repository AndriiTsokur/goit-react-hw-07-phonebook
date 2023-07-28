import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	contactsState: [],
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		addNewContact(state, action) {
			state.contactsState = action.payload;
		},
		deleteContact(state, action) {
			state.contactsState = action.payload;
		},
		setContacts(state, action) {
			state.contactsState = action.payload;
		},
	},
});

export const { addNewContact, deleteContact, setContacts } =
	contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
