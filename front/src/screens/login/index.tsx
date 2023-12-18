import { Button, Tooltip, CircularProgress } from "@mui/material";
import { LoginRegisterTab } from "./components/LoginRegisterTab";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { UserActionEnum } from "@/state/appSlice";
import { handleOnSubmit } from "./functions/handleOnSubmit";
import { EmailInput } from "./components/EmailInput";
import { useEffect, useState } from "react";
import { PasswordInput } from "./components/PasswordInput";
import { Errors } from "./components/Errors";

// LoginScreen functional component
export const LoginScreen = () => {
	// State to manage the disabled state of the submit button
	const [disableButton, setDisableButton] = useState(true);

	// Accessing the 'app' state from the Redux store using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);
	const { userAction, email, password, isLoading } = appState;

	// Function to determine the action label based on the current user action
	function handleAction(userAction: UserActionEnum): string {
		switch (userAction) {
			case UserActionEnum.login:
				return "Login";
			case UserActionEnum.register:
				return "Create Account";
			default:
				return "error";
		}
	}

	// useEffect to update the disabled state of the submit button based on email and password values
	useEffect(() => {
		if (email.value === "" || password.value === "") {
			setDisableButton(true);
			return;
		}
		setDisableButton(false);
	}, [email.value, password.value]);

	// Rendering the LoginScreen component
	return (
		<>
			{/* Main content container */}
			<main className="flex items-center justify-center">
				<div
					className="m-6 p-6 w-full rounded-lg border-solid border border-soha-color"
					style={{ maxWidth: 400 }}
				>
					{/* LoginRegisterTab component for switching between login and register tabs */}
					<LoginRegisterTab />

					{/* EmailInput component for handling email input */}
					<div className="block pt-12">
						<EmailInput />
					</div>

					{/* PasswordInput component for handling password input */}
					<div className="block pt-6 w-full">
						<PasswordInput />
					</div>

					{/* Tooltip for displaying a hint when the submit button is disabled */}
					<Tooltip
						title={
							disableButton === true ? "Email and password are required" : ""
						}
					>
						{/* Submit Button */}
						<div className="block pt-6">
							<Button
								disabled={disableButton}
								variant="contained"
								fullWidth
								onClick={() => {
									// Handling form submission
									handleOnSubmit();
								}}
							>
								{/* Displaying either a loading spinner or the action label */}
								{isLoading ? (
									<CircularProgress size={23} color="inherit" />
								) : (
									handleAction(userAction)
								)}
							</Button>
						</div>
					</Tooltip>

					{/* Errors component for displaying error messages */}
					<Errors />
				</div>
			</main>
		</>
	);
};
