import { DashboardScreen } from "@/screens/dashboard";
import { RootState } from "@/state/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
	// Initializing the useRouter hook
	const router = useRouter();

	// Accessing the app state using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);

	// Extracting the accessToken from the app state
	const { accessToken } = appState;

	// Using the useEffect hook to perform actions when the component mounts or when the accessToken changes
	useEffect(() => {
		// Checking if the accessToken is an empty string
		if (accessToken === "") {
			// Redirecting to the home page if the accessToken is empty
			router.push("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	// Returning the DashboardScreen component if the accessToken is not empty
	return <DashboardScreen />;
}
