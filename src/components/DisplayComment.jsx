function DisplayComment({ comments }) {
	return (
		<>
			{comments ? (
				comments.map((comment, index) => (
					<div key={index}>
						<h3>{comment.user.name}</h3>
						<h3>{comment.text}</h3>
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

export default DisplayComment;
