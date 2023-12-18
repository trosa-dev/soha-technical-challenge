// Importing necessary functions and types from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Enumerations representing user actions and errors
export enum UserActionEnum {
	login = 'login',
	register = 'register',
}

export enum ErrorEnum {
	null,
	user_already_registered,
	wrong_email_or_password,
	cancel,
	database,
}

// Interface representing the application state
export interface AppState {
	userAction: UserActionEnum
	accessToken: string
	isLoading: boolean
	email: {
		value: string,
		isInvalid: boolean,
	},
	password: {
		value: string,
		isInvalid: boolean,
	},
	error: ErrorEnum
}

// Initial state of the application
const initialState: AppState = {
	userAction: UserActionEnum.login,
	accessToken: '',
	isLoading: false,
	email: {
		value: '',
		isInvalid: false
	},
	password: {
		value: '',
		isInvalid: false,
	},
	error: ErrorEnum.null,
}

// Creating a Redux slice for the application state
export const appSlice = createSlice({
	name: 'app-state',
	initialState,
	reducers: {
		// Action to reset the entire state to the initial state
		reset_AppState() {
			return initialState;
		},

		// Action to set the user action in the state
		set_UserAction: (state, action: PayloadAction<UserActionEnum>) => {
			state.userAction = action.payload
		},

		// Action to set the access token in the state
		set_AccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
		},

		// Action to set the loading state in the state
		set_IsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},

		// Action to set the email value in the state
		set_Email_Value: (state, action: PayloadAction<string>) => {
			state.email.value = action.payload
		},
		// Action to set the email invalid state in the state
		set_Email_IsInvalid: (state, action: PayloadAction<boolean>) => {
			state.email.isInvalid = action.payload
		},

		// Action to set the password value in the state
		set_Password_Value: (state, action: PayloadAction<string>) => {
			state.password.value = action.payload
		},
		// Action to set the password invalid state in the state
		set_Password_IsInvalid: (state, action: PayloadAction<boolean>) => {
			state.password.isInvalid = action.payload
		},

		// Action to set the error state in the state
		set_Error: (state, action: PayloadAction<ErrorEnum>) => {
			state.error = action.payload
		},
	},
})

// Extracting action creators and reducer from the slice
export const {
	// Action to reset the state
	reset_AppState,
	// Action to set the user action
	set_UserAction,
	// Action to set the access token
	set_AccessToken,
	// Action to set the loading state
	set_IsLoading,
	// Action to set the email value
	set_Email_Value,
	// Action to set the email invalid state
	set_Email_IsInvalid,
	// Action to set the password value
	set_Password_Value,
	// Action to set the password invalid state
	set_Password_IsInvalid,
	// Action to set the error state
	set_Error,
} = appSlice.actions

// Reducer for the application state
export const appReducer = appSlice.reducer
