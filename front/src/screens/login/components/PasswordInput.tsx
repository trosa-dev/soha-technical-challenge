import { set_Password_IsInvalid, set_Password_Value } from "@/state/appSlice";
import { RootState } from "@/state/store";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const PasswordInput = () => {
	const dispatch = useDispatch();

	const appState = useSelector((state: RootState) => state.app);
	const { password } = appState;

	useEffect(() => {
		dispatch(set_Password_IsInvalid(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password.value]);

	return (
		<>
			<TextField
				required
				type="password"
				value={password.value}
				id="password-input"
				aria-label="password-input"
				label="Password"
				variant="outlined"
				fullWidth
				onChange={(event) => dispatch(set_Password_Value(event.target.value))}
				error={password.isInvalid}
				helperText={
					password.isInvalid && "Password must be > 4 and < 15 caracteres!"
				}
			/>
		</>
	);
};
