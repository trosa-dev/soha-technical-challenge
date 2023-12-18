import { reset_AppState, set_AccessToken } from "@/state/appSlice";
import { Button } from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { CopyJWTButton } from "./components/CopyJWTButton.tsx";

export const DashboardScreen = () => {
	// Initializing the useDispatch hook
	const dispatch = useDispatch();

	// Rendering the component with a main container
	return (
		<>
			<main className="flex items-center justify-center">
				<div
					className="m-6 p-6 w-full rounded-lg border-solid border border-soha-color"
					style={{ maxWidth: 400 }}
				>
					{/* Including the CopyJWTButton component for copying JWT and testing on Swagger */}
					<CopyJWTButton />

					{/* Link to the home page with a Logout button */}
					<Link className="block text-center py-4" href="/">
						{/* Button for logging out and dispatching the reset_AppState action */}
						<Button
							variant="contained"
							onClick={() => dispatch(reset_AppState())}
						>
							Logout
						</Button>
					</Link>
				</div>
			</main>
		</>
	);
};
