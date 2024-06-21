import { useEffect, useState } from "react";

async function FetchComments({ postId }) {
    console.log('fetch comments is running')

    const [comments, setComments] = useState(null)
    
    useEffect(() => {
        async function getComments() {
            try {
                const commentsResponse = await fetch(`http://localhost:3000/${postId}/comment`)
                const postComments = await commentsResponse.json();
                setComments(postComments);
            } catch(error) {
                console.log(error, 'this is error')
            }
        } getComments();
    }, [postId]) 
    return comments;
}

export default FetchComments;