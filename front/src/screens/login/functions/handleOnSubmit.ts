import {
	AppState,
	ErrorEnum,
	UserActionEnum,
	set_AccessToken,
	set_Email_IsInvalid,
	set_Error,
	set_IsLoading,
	set_Password_IsInvalid,
} from '@/state/appSlice';
import { store } from '@/state/store';
import axios, { isAxiosError } from 'axios';
import * as EmailValidator from 'email-validator';

export async function handleOnSubmit() {
	try {
		// Accessing the app state from the Redux store
		const appState: AppState = store.getState().app;
		const { email, password, userAction, isLoading } = appState;

		// Resetting error state
		store.dispatch(set_Error(ErrorEnum.null));

		// If the form is already in the loading state, exit the function
		if (isLoading) return;

		// Handling account creation (registration)
		if (userAction === UserActionEnum.register) {
			let isEmailValid: boolean = true;
			let isPasswordValid: boolean = true;

			// Validating email format
			isEmailValid = EmailValidator.validate(email.value);
			if (isEmailValid === false) {
				store.dispatch(set_Email_IsInvalid(true));
			}

			// Validating password length
			const passwordLength = password.value.length;
			if (passwordLength < 4 || passwordLength > 15) {
				isPasswordValid = false;
				store.dispatch(set_Password_IsInvalid(true));
			}

			// If email or password is invalid, exit the function
			if (!isEmailValid || !isPasswordValid) return;

			// Set loading state and simulate delay
			store.dispatch(set_IsLoading(true));
			await new Promise((f) => setTimeout(f, Number(process.env.NEXT_PUBLIC_DELAY)));

			// Making a POST request to create a user account
			const registeredUser = await axios.post<{ access_token: string }>(
				'api/user/create-user',
				{ email: email.value, password: password.value },
				{ timeout: 5_000 }
			);

			// Storing the access token in the Redux store
			store.dispatch(set_AccessToken(registeredUser.data.access_token));
		}

		// Handling login
		if (userAction === UserActionEnum.login) {
			let isEmailValid: boolean = true;

			// Validating email format
			isEmailValid = EmailValidator.validate(email.value);
			if (isEmailValid === false) {
				store.dispatch(set_Email_IsInvalid(true));
			}

			// If email is invalid, exit the function
			if (!isEmailValid) return;

			// Set loading state and simulate delay
			store.dispatch(set_IsLoading(true));
			await new Promise((f) => setTimeout(f, Number(process.env.NEXT_PUBLIC_DELAY)));

			// Making a POST request to log in the user
			const loggedUser = await axios.post<{ access_token: string }>(
				'api/auth/login',
				{ email: email.value, password: password.value },
				{ timeout: 5_000 }
			);

			// Storing the access token in the Redux store
			store.dispatch(set_AccessToken(loggedUser.data.access_token));
		}

		// Resetting loading and error states
		store.dispatch(set_IsLoading(false));
		store.dispatch(set_Error(ErrorEnum.null));
	} catch (error) {
		// Handling errors and setting appropriate error states
		store.dispatch(set_IsLoading(false));

		// Checking if the error is an Axios error
		if (isAxiosError(error)) {
			// Checking the response status code and setting error states accordingly
			if (error.response?.status) {
				switch (error.response.status) {
					case 403:
						store.dispatch(set_Error(ErrorEnum.wrong_email_or_password));
						break;
					case 409:
						store.dispatch(set_Error(ErrorEnum.user_already_registered));
						break;
					case 500:
						store.dispatch(set_Error(ErrorEnum.database));
						break;
					default:
						store.dispatch(set_Error(ErrorEnum.cancel));
				}
			}
		}
	}
}
