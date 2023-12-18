import { set_Password_IsInvalid, set_Password_Value } from "@/state/appSlice";
import { RootState } from "@/state/store";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const PasswordInput = () => {
	// Initializing Redux dispatch function
	const dispatch = useDispatch();

	// Accessing the 'app' state from the Redux store using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);
	const { password } = appState;

	// Using the useEffect hook to dispatch an action when the password value changes
	useEffect(() => {
		// Resetting the password validation state when the password value changes
		dispatch(set_Password_IsInvalid(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password.value]);

	// Rendering the PasswordInput component
	return (
		<>
			{/* Material-UI TextField component for password input */}
			<TextField
				required
				type="password"
				value={password.value}
				id="password-input"
				aria-label="password-input"
				label="Password"
				variant="outlined"
				fullWidth
				// Handling onChange event to update the password value in the Redux store
				onChange={(event) => dispatch(set_Password_Value(event.target.value))}
				// Displaying error state and helper text based on password validation
				error={password.isInvalid}
				helperText={
					password.isInvalid && "Password must be > 4 and < 15 characters!"
				}
			/>
		</>
	);
};
