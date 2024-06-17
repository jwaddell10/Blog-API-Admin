import CreatePost from "./CreatePost.jsx";
import Comment from "./Comment.jsx";
import NavBar from "./NavBar.jsx";
import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import FetchSinglePost from "./FetchSinglePost.jsx";
import DisplaySinglePost from "./DisplaySinglePost.jsx";
import { Link, useNavigate } from "react-router-dom";
import { PostContext } from "../App.jsx";
import FetchPost from "./FetchPost.jsx";

function DisplayPost() {
	const posts = FetchPost();
	const [data, setData] = useState(null);
	const [singlePost, setSinglePost] = useState(null);

	const fetchSinglePost = async (id) => {
		const response = await fetch(`http://localhost:3000/post/${id}`);
		const post = await response.json();
		// console.log(post, "post");
		setSinglePost(post);
	};
	return (
		<div>
			{!singlePost &&
				posts &&
				posts.map((post, index) => (
					<div key={index} onClick={() => fetchSinglePost(post._id)}>
						<Post
							key={index}
							id={post._id}
							title={post.title}
							date={post.date}
							name={post.user.name}
							text={post.text}
							visibility={post.visibility}
						/>
						{/* <Comment /> */}
					</div>
				))}
			{singlePost && (
				<>
					<div>
						<h1>{singlePost.title}</h1>
						<h2>{singlePost.user.name}</h2>
						<h2>{singlePost.date}</h2>
						<p>{singlePost.text}</p>
						<Comment />
					</div>
				</>
			)}
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
			const response = await fetch(import.meta.env.UPDATE_POST_URL, {
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
					<button
						onClick={() => {
							FetchSinglePost(id);
						}}
					>
						Click here
					</button>
					<button onClick={handleEditing}>Edit</button>
				</>
			)}
		</>
	);
}

export default DisplayPost;
