import React, { useState } from "react";

function Login() {
	const [data, setData] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (let [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}x

		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formDataObject),
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				if (data.token) {
					window.location.href = "/";
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
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
		</>
	);
}

export default Login;