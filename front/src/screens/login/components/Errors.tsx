import { ErrorEnum } from "@/state/appSlice";
import { RootState } from "@/state/store";
import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";

export const Errors = () => {
	// Accessing the 'app' state from the Redux store using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);
	const { error } = appState;

	// Rendering the Errors component only if there is an error present
	return (
		<>
			{error !== ErrorEnum.null && (
				<>
					{/* Material-UI Alert component to display error messages */}
					<Alert className="mt-6" variant="filled" severity="error">
						{/* Alert title */}
						<AlertTitle>Error</AlertTitle>
						{/* Displaying specific error messages based on the error enum */}
						{error === ErrorEnum.user_already_registered && (
							<>{"There is already a user registered with this email"}</>
						)}
						{error === ErrorEnum.wrong_email_or_password && (
							<>{"Wrong email or password"}</>
						)}
						{error === ErrorEnum.cancel && (
							<>{"It looks like our backend is offline"}</>
						)}
						{error === ErrorEnum.database && (
							<>{"It looks like our database is offline"}</>
						)}
					</Alert>
				</>
			)}
		</>
	);
};
