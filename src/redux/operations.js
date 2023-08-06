import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchContactsData,
	postNewContact,
	deleteContactData,
} from 'services/api';

export const fetchContactsThunk = createAsyncThunk(
	'contacts/fetchContactsThunk',
	async (_, thunkApi) => {
		try {
			const { data } = await fetchContactsData();
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const addContactThunk = createAsyncThunk(
	'contacts/addContactThunk',
	async (newContactData, thunkApi) => {
		try {
			const { data } = await postNewContact(newContactData);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const deleteContactThunk = createAsyncThunk(
	'contacts/deleteContactThunk',
	async (contactId, thunkApi) => {
		try {
			const { data } = await deleteContactData(contactId);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
