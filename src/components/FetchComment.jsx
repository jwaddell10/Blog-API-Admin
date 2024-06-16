import { useEffect, useState } from "react";

function FetchComment() {
	const [comments, setComments] = useState();

	useEffect(() => {
		async function getComments() {
			const response = await fetch("http://localhost:3000/comment");
		}
		getComments();
	}, []);
}

export default FetchComment;
