import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { InsertLink } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export const CopyJWTButton = () => {
	// State to manage the visibility of the Snackbar
	const [open, setOpen] = useState(false);

	// Accessing the app state using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);

	// Extracting the accessToken from the app state
	const { accessToken } = appState;

	// Function to handle the click event and copy the JWT to the clipboard
	const handleClick = () => {
		// Setting the Snackbar to be visible
		setOpen(true);

		// Copying the accessToken to the clipboard using the Clipboard API
		navigator.clipboard.writeText(accessToken);
	};

	// Rendering the component with two IconButton sections and a Snackbar
	return (
		<>
			{/* First IconButton section for copying JWT */}
			<div className="text-center py-4">
				<IconButton
					className="text-lg font-semibold"
					onClick={handleClick}
					color="primary"
				>
					<ContentCopy className="me-2" />
					<>{"Copy JWT"}</>
				</IconButton>
			</div>

			{/* Second IconButton section for testing JWT on Swagger */}
			<div className="text-center pb-6 p-4">
				<IconButton className="text-xs" onClick={handleClick} color="primary">
					<InsertLink className="me-2" />
					{/* Link to test JWT on Swagger */}
					<a
						href="http://localhost:3001/api#/Auth/AuthController_getAccessTokenPayload"
						target="_blank"
					>
						{"Test JWT on Swagger"}
					</a>
				</IconButton>
			</div>

			{/* Snackbar for displaying a message when JWT is copied */}
			<Snackbar
				message="JWT Copied to clipboard"
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={2000}
				onClose={() => setOpen(false)}
				open={open}
			/>
		</>
	);
};
