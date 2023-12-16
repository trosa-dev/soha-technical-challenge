import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export enum UserActionEnum {
	login = 'login',
	register = 'register',
}

export interface AppState {
	userAction: UserActionEnum
}

const initialState: AppState = {
	userAction: UserActionEnum.login,
}

export const appSlice = createSlice({
	name: 'app-state',
	initialState,
	reducers: {
		set_UserAction: (state, action: PayloadAction<UserActionEnum>) => {
			state.userAction = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { set_UserAction } = appSlice.actions
export const appReducer = appSlice.reducer