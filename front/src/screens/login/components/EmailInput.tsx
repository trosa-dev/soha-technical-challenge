import { set_Email_IsInvalid, set_Email_Value } from "@/state/appSlice";
import { RootState } from "@/state/store";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EmailInput = () => {
	// Initializing Redux dispatch function
	const dispatch = useDispatch();

	// Accessing the 'app' state from the Redux store using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);
	const { email } = appState;

	// Using the useEffect hook to dispatch an action when the email value changes
	useEffect(() => {
		// Resetting the email validation state when the email value changes
		dispatch(set_Email_IsInvalid(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email.value]);

	// Rendering the EmailInput component
	return (
		<>
			{/* Material-UI TextField component for email input */}
			<TextField
				required
				value={email.value}
				id="email-input"
				aria-label="email-input"
				label="Email"
				variant="outlined"
				fullWidth
				// Handling onChange event to update the email value in the Redux store
				onChange={(event) => dispatch(set_Email_Value(event.target.value))}
				// Displaying error state and helper text based on email validation
				error={email.isInvalid}
				helperText={email.isInvalid && "Email is not valid!"}
			/>
		</>
	);
};
