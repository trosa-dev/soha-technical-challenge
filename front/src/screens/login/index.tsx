import { Button, TextField } from "@mui/material";
import { LoginRegisterTab } from "./components/LoginRegisterTab";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { UserActionEnum } from "@/state/appSlice";
import { handleOnSubmit } from "./functions/handleOnSubmit";
import { EmailInput } from "./components/EmailInput";

export const LoginScreen = () => {
	const appState = useSelector((state: RootState) => state.app);
	const { userAction } = appState;

	function handleAction(userAction: UserActionEnum) {
		switch (userAction) {
			case UserActionEnum.login:
				return "Login";
			case UserActionEnum.register:
				return "Create Account";
			default:
				return "error";
		}
	}

	return (
		<>
			<main className="flex items-center justify-center">
				<div
					className="m-6 p-6 w-full rounded-lg border-solid border border-soha-color"
					style={{ maxWidth: 400 }}
				>
					<LoginRegisterTab />

					<div className="block pt-12">
						<EmailInput />
					</div>

					<div className="block pt-6 w-full">
						<TextField
							id="password-input"
							aria-label="password-input"
							label="Password"
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="block pt-6">
						<Button
							variant="contained"
							fullWidth
							onClick={() => {
								handleOnSubmit();
							}}
						>
							{handleAction(userAction)}
						</Button>
					</div>
				</div>
			</main>
		</>
	);
};
