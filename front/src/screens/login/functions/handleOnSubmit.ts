import { AppState, set_Email_IsInvalid } from '@/state/appSlice';
import { store } from '@/state/store';
import * as EmailValidator from 'email-validator';

export function handleOnSubmit() {

	const appState: AppState = store.getState().app
	const { email } = appState

	const isEmailValid = EmailValidator.validate(email.value)

	isEmailValid ? store.dispatch(set_Email_IsInvalid(false)) : store.dispatch(set_Email_IsInvalid(true))

	console.log('rodei')

}