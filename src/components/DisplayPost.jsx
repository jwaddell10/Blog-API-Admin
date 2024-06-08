import CreatePost from "./CreatePost.jsx";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function DisplayPost({ posts }) {
	console.log(posts, "this is posts");
	return (
		<div>
			{posts &&
				posts.map((post, index) => (
					<Post
						key={index}
						title={post.title}
						date={post.date}
						name={post.user.name}
						text={post.text}
						visibility={post.visibility}
					/>
				))}
			<CreatePost />
		</div>
	);
}

function Post({ title, date, name, text, visibility }) {
	const [editing, setEditing] = useState(false);
	const [published, setPublished] = useState(visibility);
	const [formData, setFormData] = useState({
		title: title,
		text: text,
	});

	const checkHandler = () => {
		setPublished(!published);
	};

	const handleChange = (event) => {
		setFormData(event.target.value);
	};

	const handleEditing = () => {
		setEditing(!editing);
	};

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(formData, "this is formdata");
		//have form data, take the title and such and send to backend
		const JWTToken = localStorage.getItem("JWT Token");
		const formDataTitle = formData.title;
		const formDataText = formData.text;

		const isPublished = event.target.elements[2].checked

		fetch("http://localhost:3000/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				formDataTitle,
				JWTToken,
				formDataText,
				isPublished
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	};

	return (
		<>
			{editing ? (
				<form action="POST" onSubmit={handleSubmit}>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="text"
						value={formData.text}
						onChange={handleChange}
					/>
					<input
						type="checkbox"
						onChange={checkHandler}
						value={published}
					/>
					Publish
					<button type="submit">Add Post</button>
					{/* <button onClick={handleSubmit}>Submit</button> */}
				</form>
			) : (
				<>
					<li>{title}</li>
					<li>{date}</li>
					<li>{name}</li>
					<li>{text}</li>
					<li>{visibility}</li>
					<input
						type="checkbox"
						checked={published}
						onChange={checkHandler}
					/>
					<button onClick={handleEditing}>Edit</button>
				</>
			)}
		</>
	);
}

export default DisplayPost;
