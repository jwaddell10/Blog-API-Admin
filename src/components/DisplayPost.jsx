import CreatePost from "./CreatePost.jsx"
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FetchPost from "./FetchPost";

function DisplayPost() {
    const [published, setPublished] = useState();

    const checkHandler = () => {
        setPublished(!published)
    }

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
								<li>{item.user.name}</li>
								<li>{item.text}</li>
                                <input type="checkbox" checked={published} onChange={checkHandler}/>Published
							</ul>
						</div>
					);
				})}
            <CreatePost />
		</div>
	);
}

export default DisplayPost;