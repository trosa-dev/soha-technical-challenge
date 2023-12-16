import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { LoginRegisterTab } from "./components/LoginRegisterTab";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { UserActionEnum } from "@/state/appSlice";

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
						<TextField
							id="outlined-basic"
							label="Email"
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="block pt-6 w-full">
						<TextField
							id="outlined-basic"
							label="Password"
							variant="outlined"
							fullWidth
						/>
					</div>

					<Link className="block pt-6" href="/dashboard">
						<Button variant="contained" fullWidth>
							{handleAction(userAction)}
						</Button>
					</Link>
				</div>
			</main>
		</>
	);
};
