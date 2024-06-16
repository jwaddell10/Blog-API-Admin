import DisplayPost from "./DisplayPost";

function HomePage({ posts }) {
	return (
		<>
			<DisplayPost posts={posts}/>
		</>
	);
}

export default HomePage;