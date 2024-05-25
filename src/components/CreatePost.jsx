function CreatePost() {
	const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
		const formDataObject = {};
		for (let [key, value] of formData.entries()) {
			formDataObject[key] = value;
		}

        fetch("http://localhost:3000/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formDataObject),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data, "this is data");
			});
	};

	return (
		<div>
            <form action="POST" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title"/>
                <label htmlFor="text">Post</label>
                <input type="text" name="text"/>
                <button type="submit">Add Post</button>
            </form>
		</div>
	);
}

export default CreatePost;