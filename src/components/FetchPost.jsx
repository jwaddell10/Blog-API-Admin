import { useState, useEffect } from "react";

function FetchPost() {
	const [blogPosts, setBlogPosts] = useState(null);
	useEffect(() => {
		async function getPosts() {
			try {
				const response = await fetch("http://localhost:3000/post");
				const posts = await response.json();
				console.log(posts, 'this is posts')
				setBlogPosts(posts);
			} catch (err) {
				console.log("Error", err);
			}
		}
		getPosts();
	}, []);
	return blogPosts;
}

export default FetchPost;