import { useEffect, useState } from "react";

function SinglePost() {
    const [data, setData] = useState(null);
    const [singlePost, setSinglePost] = useState(null)
    
    const fetchSinglePost = async (id) => {
        const response = await fetch(`http://localhost:3000/post/${id}`)
        const post = await response.json()
        console.log(post, "post")
        setSinglePost(post);
    }

	// try {
	// 	const response = await fetch(
	// 		`http://localhost:3000/post/${id}`,
	// 		{
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				// Include any additional headers if needed, such as Authorization
	// 			},
	// 		}
	// 	);

	// 	if (!response.ok) {
	// 		throw new Error(`HTTP error ${response.status}`);
	// 	}

	// 	const data = await response.json();
	//     // console.log(data, 'this is data')
	// 	return data;
	// } catch (error) {
	// 	console.error("Error fetching single post:", error);
	// 	throw error;
	// }
	return (
		<>
			{data && data.map(({title, text, id}) => {
                (
                    <div onClick={() => fetchSinglePost(id)}>
                        <h1>{title}</h1>
                        <h1>{text}</h1>
                    </div>
                )
            })}
		</>
	);
};

export default SinglePost;
