import { Button } from "@mui/material";
import Link from "next/link";

const DashboardScreen = () => {
	return (
		<>
			Dashboard
			<Button>
				<Link href="/">Dashboard</Link>
			</Button>
		</>
	);
};

export default DashboardScreen;
