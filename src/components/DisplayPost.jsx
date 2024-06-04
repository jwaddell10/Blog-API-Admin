import CreatePost from "./CreatePost.jsx";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FetchPost from "./FetchPost";

function DisplayPost() {
    const posts = FetchPost();

	const [published, setPublished] = useState();
	// const JWTToken = localStorage.getItem("JWT Token");
	const checkHandler = () => {
		setPublished(!published);
	};

	// fetch("http://localhost:3000/post", {
	// 	method: "POST",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify({
	// 		published,
	// 		JWTToken,
	// 	}),
	// })
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		console.log(data, "this is data");
	// 	});

	return (
		<div>
			{posts &&
				posts.map((item) => {
					return (
						<div key={uuidv4()}>
							<ul>
								<li>{item.title}</li>
								<li>{item.date}</li>
								<li>{item.user.name}</li>
								<li>{item.text}</li>
								<li>
									<input
										type="checkbox"
										checked={published}
										onChange={checkHandler}
									/>
									{item.visibility}
								</li>
							</ul>
						</div>
					);
				})}
			<CreatePost />
		</div>
	);
}

export default DisplayPost;
