import { useOptimistic, useState, useRef } from "react";
import { redirect } from "react-router-dom";

function Signup() {
	const [signupData, setSignupData] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (let [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

		fetch("http://localhost:3000/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formDataObject),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.errors) {
					setSignupData(data);
				} else {
					window.location.href = "/";
				}
			});
	};

	return (
		<>
			<form action="/signup" onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="username"
					autoComplete="name"
				/>

				<input
					type="password"
					name="password"
					placeholder="password"
					autoComplete="password"
				/>

				<input
					type="password"
					name="passwordConfirmation"
					placeholder="confirm password"
					autoComplete="passwordConfirmation"
				/>

				<button type="submit">Submit</button>
			</form>
			{signupData && <div>{signupData.errors[0].msg}</div>}
		</>
	);
}

export default Signup;
