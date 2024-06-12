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
						id={post._id}
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

function Post({ id, title, date, name, text, visibility }) {
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const JWTToken = localStorage.getItem("JWT Token");
		const formData = event.target.elements;
		const title = formData[0].value;
		const text = formData[1].value;
		const isPublished = event.target.elements[2].checked;
		setEditing(!editing);
		try {
			const response = await fetch(`http://localhost:3000/post/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JWTToken}`,
				},
				body: JSON.stringify({
					title,
					text,
					published: isPublished,
					JWTToken,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error ${response.status}`);
			}
			// setEditing(editing)
		} catch (error) {
			console.error("Error:", error);
		}
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
