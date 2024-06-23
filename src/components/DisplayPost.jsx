import CreatePost from "./CreatePost.jsx";
import CreateComment from "./CreateComment.jsx";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import DisplaySinglePost from "./DisplaySinglePost.jsx";
import DisplayComment from "./DisplayComment.jsx";
import { Link, useNavigate, redirect } from "react-router-dom";
import FetchPost from "./FetchPost.jsx";

function DisplayPost({ onStateChange, blogPosts }) {
	//need to separate createcomment and display comments
	//need to add edit/delete feature to comments
	const navigate = useNavigate();
	const [singlePost, setSinglePost] = useState(null);
	const [comments, setComments] = useState(null);

	const handleDeletePost = async (id) => {
		const JWTToken = localStorage.getItem("JWT Token");
		const response = await fetch(`http://localhost:3000/post/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application.json",
				Authorization: `${JWTToken}`,
			},
		});
		const data = await response.json();
		// console.log(data, 'this is data')
		if (data) {
			// return redirect("/post")
			navigate("/post", { state: { key: "blogPosts" } });
		}
	};

	const updatePostIdInParent = (id) => {
		onStateChange(id);
	};

	const fetchSinglePostAndComments = async (id) => {
		const response = await fetch(`http://localhost:3000/post/${id}`);
		const post = await response.json();
		setSinglePost(post);
		navigate(`/post/${post._id}`);

		const commentsResponse = await fetch(
			`http://localhost:3000/${id}/comment`
		);
		const postComments = await commentsResponse.json();
		setComments(postComments);
	};
	return (
		<div>
			{!singlePost &&
				blogPosts &&
				blogPosts.map((post, index) => (
					<div
						key={index}
						onClick={() => {
							updatePostIdInParent(post._id);
							fetchSinglePostAndComments(post._id);
						}}
					>
						<Post
							key={index}
							id={post._id}
							title={post.title}
							date={post.date}
							name={post.user.name}
							text={post.text}
							visibility={post.visibility}
						/>
					</div>
				))}
			{singlePost && (
				<>
					<Post
						id={singlePost._id}
						title={singlePost.title}
						date={singlePost.date}
						name={singlePost.user.name}
						text={singlePost.text}
						visibility={singlePost.visibility}
					></Post>
					<div>
						<DisplayComment
							refetchPosts={FetchPost}
							setComments={setComments}
							postComments={comments}
						></DisplayComment>
						<CreateComment
							comments={comments}
							setComments={setComments}
							id={singlePost._id}
						/>
						<button
							onClick={() => {
								handleDeletePost(singlePost._id);
							}}
						>
							Delete Post
						</button>
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

	const updateFormData = (event) => {
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
						onChange={updateFormData}
					/>
					<input
						type="text"
						name="text"
						value={formData.text}
						onChange={updateFormData}
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
				<div key={id}>
					<li>{title}</li>
					<li>{date}</li>
					<li>{name}</li>
					<li>{text}</li>
					<li>{visibility}</li>
					<button onClick={handleEditing}>Edit</button>
				</div>
			)}
		</>
	);
}

export default DisplayPost;
