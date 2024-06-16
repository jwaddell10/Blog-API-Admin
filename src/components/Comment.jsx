function Comment() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const JWTToken = localStorage.getItem("JWTToken");
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (const [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

		fetch(import.meta.env.FETCH_COMMENT_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `${JWTToken}`,
			},
			body: JSON.stringify({
				formDataObject,
				JWTToken,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Username</label>
				<input type="text" name="name" />
				<label htmlFor="text">Comment</label>
				<input type="text" name="text" />
				<button type="submit">Add Comment</button>
			</form>
		</>
	);
}

export default Comment;
