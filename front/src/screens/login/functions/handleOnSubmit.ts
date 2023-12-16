import { AppState, UserActionEnum, set_Email_IsInvalid, set_Password_IsInvalid } from '@/state/appSlice';
import { store } from '@/state/store';
import * as EmailValidator from 'email-validator';

export function handleOnSubmit() {

	const appState: AppState = store.getState().app
	const { email, password, userAction } = appState

	const isEmailValid = EmailValidator.validate(email.value)

	isEmailValid ? store.dispatch(set_Email_IsInvalid(false)) : store.dispatch(set_Email_IsInvalid(true))

	if (userAction === UserActionEnum.register) {
		const passwordLength = password.value.length
		if (passwordLength < 4 || passwordLength > 15)
			store.dispatch(set_Password_IsInvalid(true))
	}

}