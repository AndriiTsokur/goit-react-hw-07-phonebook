import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: [],
	reducers: {
		addNewContact(state, action) {
			return (state = action.payload);
		},
		deleteContact(state, action) {
			return (state = action.payload);
		},
		setContacts(state, action) {
			return (state = action.payload);
		},
	},
});

export const { addNewContact, deleteContact, setContacts } =
	contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
