import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: null,
	error: null,
	isLoading: false,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.isLoading = true;
		},
		signInSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		signOut: (state) => {
			state.currentUser = null;
			state.error = null;
			state.isLoading = false;
		},
		updateUserStart: (state) => {
			state.isLoading = true;
		},
		updateUserSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		deleteUserStart: (state) => {
			state.isLoading = true;
		},
		deleteUserSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = null;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	signOut,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
