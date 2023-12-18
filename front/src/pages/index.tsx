import { LoginScreen } from "@/screens/login";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Home() {
	// Initializing the useRouter hook
	const router = useRouter();

	// Accessing the app state using the useSelector hook
	const appState = useSelector((state: RootState) => state.app);

	// Extracting the accessToken from the app state
	const { accessToken } = appState;

	// Using the useEffect hook to perform actions when the component mounts or when the accessToken changes
	useEffect(() => {
		// Checking if the accessToken is not an empty string
		if (accessToken !== "") {
			// Redirecting to the dashboard page if the accessToken is not empty
			router.push("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	// Returning the LoginScreen component
	return <LoginScreen />;
}
