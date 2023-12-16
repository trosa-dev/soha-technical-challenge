import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum UserActionEnum {
	login = 'login',
	register = 'register',
}

export interface AppState {
	userAction: UserActionEnum
	email: {
		value: string,
		isInvalid: boolean,
	},
	password: {
		value: string,
		isInvalid: boolean,
	}
}

const initialState: AppState = {
	userAction: UserActionEnum.login,
	email: {
		value: '',
		isInvalid: false
	},
	password: {
		value: '',
		isInvalid: false,
	}
}

export const appSlice = createSlice({
	name: 'app-state',
	initialState,
	reducers: {
		//USER ACTION
		set_UserAction: (state, action: PayloadAction<UserActionEnum>) => {
			state.userAction = action.payload
		},

		//EMAIL
		set_Email_Value: (state, action: PayloadAction<string>) => {
			state.email.value = action.payload
		},
		set_Email_IsInvalid: (state, action: PayloadAction<boolean>) => {
			state.email.isInvalid = action.payload
		},

		//PASSWORD
		set_Password_Value: (state, action: PayloadAction<string>) => {
			state.password.value = action.payload
		},
		set_Password_IsInvalid: (state, action: PayloadAction<boolean>) => {
			state.password.isInvalid = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	//USER ACTION
	set_UserAction,
	//EMAIL
	set_Email_Value,
	set_Email_IsInvalid,
	//PASSWORD
	set_Password_Value,
	set_Password_IsInvalid
} = appSlice.actions
export const appReducer = appSlice.reducer