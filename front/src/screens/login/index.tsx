import { Button, Tooltip } from "@mui/material";
import { LoginRegisterTab } from "./components/LoginRegisterTab";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { UserActionEnum } from "@/state/appSlice";
import { handleOnSubmit } from "./functions/handleOnSubmit";
import { EmailInput } from "./components/EmailInput";
import { useEffect, useState } from "react";
import { PasswordInput } from "./components/PasswordInput";

export const LoginScreen = () => {
	const [disableButton, setDisableButton] = useState(true);

	const appState = useSelector((state: RootState) => state.app);
	const { userAction, email, password } = appState;

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

	useEffect(() => {
		if (email.value === "" || password.value === "") {
			setDisableButton(true);
			return;
		}
		setDisableButton(false);
	}, [email.value, password.value]);

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
						<PasswordInput />
					</div>

					<Tooltip
						title={
							disableButton === true ? "Email and password are required" : ""
						}
					>
						<div className="block pt-6">
							<Button
								disabled={disableButton}
								variant="contained"
								fullWidth
								onClick={() => {
									handleOnSubmit();
								}}
							>
								{handleAction(userAction)}
							</Button>
						</div>
					</Tooltip>
				</div>
			</main>
		</>
	);
};
