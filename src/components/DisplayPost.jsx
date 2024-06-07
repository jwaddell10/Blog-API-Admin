import CreatePost from "./CreatePost.jsx";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FetchPost from "./FetchPost";

function DisplayPost({ posts }) {

	const [published, setPublished] = useState();
	const [editing, setEditing] = useState(false);
	const [activeIndex, setActiveIndex] = useState();
	
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
		setActiveIndex(index)
		setEditing(!editing)
	};
	return (
		<div>
			{posts &&
				posts.map((item, index) => {
					return (
						<div key={uuidv4()}>
							<ul style={editing && index === activeIndex ? editMode : viewMode}>
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
								<button onClick={() => handleEditing(index)}>Edit</button>
							</ul>
							<ul style={editing && index === activeIndex ? viewMode : editMode}>
								<CreatePost value={item.title} posts={posts}/>
								<button onClick={() => handleEditing(index)}>Edit</button>
							</ul>
						</div>
					);
				})}
			<CreatePost />
		</div>
	);
}

export default DisplayPost;
