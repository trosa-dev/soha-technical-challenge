import { set_Email_IsInvalid, set_Email_Value } from "@/state/appSlice";
import { RootState } from "@/state/store";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EmailInput = () => {
	const dispatch = useDispatch();

	const appState = useSelector((state: RootState) => state.app);
	const { email } = appState;

	useEffect(() => {
		dispatch(set_Email_IsInvalid(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email.value]);

	return (
		<>
			<TextField
				value={email.value}
				id="email-input"
				aria-label="email-input"
				label="Email"
				variant="outlined"
				fullWidth
				onChange={(event) => dispatch(set_Email_Value(event.target.value))}
				error={email.isInvalid}
				helperText={email.isInvalid && "Email is not valid!"}
			/>
		</>
	);
};
