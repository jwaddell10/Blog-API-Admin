import { useState, useContext } from "react";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
	const [data, setData] = useState(null);
	const navigate = useNavigate();

	const { setIsUserLoggedIn } = useContext(LoginContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (let [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

		fetch(import.meta.env.LOGIN_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formDataObject),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsUserLoggedIn(true);
				setData(data);
				if (data.token) {
					localStorage.setItem("JWT Token", data.token);
					navigate("/");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};
	const SignupForm = () => {
		window.location.href = "/signup";
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="username"
					autoComplete="username"
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					autoComplete="password"
				/>
				<button type="submit">Submit</button>
			</form>
			{data && (
				<div>
					<div>{data.message}</div>
				</div>
			)}
			<div onClick={SignupForm}>
				Not a member? Click to create an account
			</div>
		</>
	);
}

export default Login;