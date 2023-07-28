import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	filterState: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter(state, action) {
			state.filterState = action.payload;
		},
	},
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
