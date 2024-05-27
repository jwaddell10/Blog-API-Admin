import { useState } from "react";

function CreatePost() {
	const [published, setPublished] = useState();

	const checkHandler = () => {
		setPublished(!published);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const JWTToken = localStorage.getItem("JWT Token");
		const formData = new FormData(event.target);
		const formDataObject = {};
		for (let [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

		const isPublished = event.target.elements[2].value;

		fetch("http://localhost:3000/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				formDataObject,
				JWTToken,
				isPublished,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	};

	return (
		<div>
			<form action="POST" onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" />
				<label htmlFor="text">Post</label>
				<input type="text" name="text" />
				<input
					type="checkbox"
					onChange={checkHandler}
					value={published}
				/>
				Publish
				<button type="submit">Add Post</button>
			</form>
		</div>
	);
}

export default CreatePost;
