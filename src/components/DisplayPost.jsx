import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FetchPost from "./FetchPost";

function DisplayPost() {
	const posts = FetchPost();

	return (
		<div>
			{posts &&
				posts.map((item) => {
					return (
						<div key={uuidv4()}>
							<ul>
								<li>{item.title}</li>
								<li>{item.date}</li>
								<li>{item.name}</li>
								<li>{item.text}</li>
							</ul>
						</div>
					);
				})}
		</div>
	);
}

export default DisplayPost;