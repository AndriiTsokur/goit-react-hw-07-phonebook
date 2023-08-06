import { createSlice } from '@reduxjs/toolkit';
import {
	fetchContactsThunk,
	addContactThunk,
	deleteContactThunk,
} from './operations';

const initialState = {
	contactsState: [],
	isLoading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	extraReducers: builder =>
		builder
			.addCase(fetchContactsThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchContactsThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.contactsState = action.payload;
			})
			.addCase(fetchContactsThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(addContactThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addContactThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.contactsState.push(action.payload);
			})
			.addCase(addContactThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(deleteContactThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteContactThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				const deletedIndex = state.contactsState.findIndex(
					contact => contact.id === action.payload.id
				);
				state.contactsState.splice(deletedIndex, 1);
			})
			.addCase(deleteContactThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}),
});

export const contactsReducer = contactsSlice.reducer;
