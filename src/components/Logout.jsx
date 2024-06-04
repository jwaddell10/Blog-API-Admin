import { LoginContext } from "../App";
import { useContext } from "react";

function Logout() {
	const { setIsUserLoggedIn } = useContext(LoginContext);

	const token = localStorage.getItem("JWT Token");
	if (token) {
		localStorage.removeItem("JWT Token");
		setIsUserLoggedIn(false);
	}
}

export default Logout;
