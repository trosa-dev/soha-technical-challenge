import {
	UserActionEnum as UserActionEnum,
	set_UserAction,
} from "@/state/appSlice";
import { RootState } from "@/state/store";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export const LoginRegisterTab = () => {
	const dispatch = useDispatch();

	const appState = useSelector((state: RootState) => state.app);
	const { userAction } = appState;

	function handleButtonVariant(tab: UserActionEnum): "contained" | "outlined" {
		return userAction === tab ? "contained" : "outlined";
	}

	return (
		<>
			<div className="block sm:flex">
				<div className="w-full sm:w-1/2 sm:pe-2">
					<Button
						variant={handleButtonVariant(UserActionEnum.login)}
						fullWidth
						onClick={() => dispatch(set_UserAction(UserActionEnum.login))}
					>
						Login
					</Button>
				</div>
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
