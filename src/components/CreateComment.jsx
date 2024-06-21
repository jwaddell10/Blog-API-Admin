function CreateComment({id}) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const JWTToken = localStorage.getItem("JWT Token");
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (const [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

		fetch(`http://localhost:3000/${id}/comment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `${JWTToken}`,
			},
			body: JSON.stringify({
				formDataObject,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data, 'this is data')
				return data;
			});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="text">Comment</label>
				<input type="text" name="text" />
				<button type="submit">Add Comment</button>
			</form>
		</>
	);
}

export default CreateComment;
