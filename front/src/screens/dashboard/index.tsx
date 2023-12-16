import { Button, TextField } from "@mui/material";
import Link from "next/link";

export const DashboardScreen = () => {
	return (
		<main className="flex items-center justify-center">
			<div
				className="m-6 p-6 w-full rounded-lg border-solid border border-soha-color"
				style={{ maxWidth: 400 }}
			>
				<Link className="block pt-6" href="/">
					<Button variant="contained">Logout</Button>
				</Link>
			</div>
		</main>
	);
};
