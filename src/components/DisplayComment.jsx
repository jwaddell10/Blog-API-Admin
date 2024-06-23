import PropTypes from "prop-types";

function DisplayComment({ postComments, setComments }) {
	const deleteComment = async (id) => {
		const JWTToken = localStorage.getItem("JWT Token");
		const response = await fetch(`http://localhost:3000/comment/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application.json",
				Authorization: `${JWTToken}`,
			},
		});
		if (response.ok) {
			setComments((prevComments) =>
				prevComments.filter((comment) => comment._id !== id)
			);
		}
	};

	return (
		<>
			{postComments ? (
				postComments.map((comment, index) => (
					<div key={index}>
						<h3>{comment.user.name}</h3>
						<h3>{comment.text}</h3>
						<button
							onClick={() => {
								deleteComment(comment._id);
							}}
						>
							Delete Comment
						</button>
					</div>
				))
			) : (
				<>
					<div>no comments</div>
				</>
			)}
		</>
	);
}

DisplayComment.propTypes = {
	postComments: PropTypes.array,
	setComments: PropTypes.func,
};

export default DisplayComment;