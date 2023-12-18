import {
	ErrorEnum,
	UserActionEnum as UserActionEnum,
	set_Email_IsInvalid,
	set_Error,
	set_Password_IsInvalid,
	set_UserAction,
} from "@/state/appSlice";
import { RootState } from "@/state/store";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LoginRegisterTab = () => {
	// Initializing Redux dispatch function
	const dispatch = useDispatch();

	// Accessing the 'app' state from the Redux store using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);
	const { userAction } = appState;

	// Function to determine the variant of the Button based on the current user action
	function handleButtonVariant(tab: UserActionEnum): "contained" | "outlined" {
		return userAction === tab ? "contained" : "outlined";
	}

	// Resetting certain states when the user action changes
	useEffect(() => {
		dispatch(set_Email_IsInvalid(false));
		dispatch(set_Password_IsInvalid(false));
		dispatch(set_Error(ErrorEnum.null));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAction]);

	// Rendering the LoginRegisterTab component
	return (
		<>
			{/* Container for login and register buttons */}
			<div className="block sm:flex">
				{/* Login Button */}
				<div className="w-full sm:w-1/2 sm:pe-2">
					<Button
						variant={handleButtonVariant(UserActionEnum.login)}
						fullWidth
						onClick={() => dispatch(set_UserAction(UserActionEnum.login))}
					>
						Login
					</Button>
				</div>
				{/* Register Button */}
				<div className="w-full pt-4 sm:pt-0 sm:w-1/2 sm:ps-2">
					<Button
						variant={handleButtonVariant(UserActionEnum.register)}
						fullWidth
						onClick={() => dispatch(set_UserAction(UserActionEnum.register))}
					>
						Register
					</Button>
				</div>
			</div>
		</>
	);
};
