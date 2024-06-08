import CreatePost from "./CreatePost.jsx";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post.jsx";

function DisplayPost({ posts }) {
	const [published, setPublished] = useState();
	const [editing, setEditing] = useState(false);
	// const [activeIndex, setActiveIndex] = useState();	

	let viewMode = {};
	let editMode = {};
	if (editing) {
		viewMode.display = "none";
	} else {
		editMode.display = "none";
	}

	const checkHandler = () => {
		setPublished(!published);
	};
	const handleEditing = (index) => {
		// setActiveIndex(index);
		const newPosts = [...posts];
		const updatePosts = newPosts[index];
		setEditing(!editing);
	};

	return (
		<div>
			{posts &&
				posts.map((post, index) => {

					return (
						<div key={uuidv4()}>
							<ul style={viewMode}>
								<li>{post.title}</li>
								<li>{post.date}</li>
								<li>{post.user.name}</li>
								<li>{post.text}</li>
								<li>
									<input
										type="checkbox"
										checked={published}
										onChange={checkHandler}
									/>
									{post.visibility}
								</li>
								<button
									onClick={() => {
										handleEditing(index);
									}}
								>
									Edit
								</button>
							</ul>
							<ul style={editMode}>
								<CreatePost value={post.title} posts={posts} />
								<button onClick={handleEditing}>Edit</button>
							</ul>
						</div>
					);
				})}
			<CreatePost />
			<Post />
		</div>
	);
}

export default DisplayPost;
