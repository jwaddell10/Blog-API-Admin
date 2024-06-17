import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import DisplayPost from "./components/DisplayPost.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Signup from "./components/Signup.jsx";
import FetchPost from "./components/FetchPost.jsx";
import SinglePost from "./components/FetchSinglePost.jsx";
import DisplaySinglePost from "./components/DisplaySinglePost.jsx";

export const LoginContext = createContext(null);
export const PostContext = createContext(null);

function App() {
	// const singlePost = FetchSinglePost();
	// console.log(singlePost, 'this is singlepost')
	const posts = FetchPost();
	// console.log(post, 'this ispost in fetchsingle')
	// const post = FetchSinglePost();
	// console.log(post, 'thisis post')
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [postId, setPostId] = useState(null);

	// const post = FetchSinglePost(postId)

	const token = localStorage.getItem("JWT Token");

	return (
		<LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
			<Router>
				<PostContext.Provider value={{ postId, setPostId }}>
					<NavBar />
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/post" element={<DisplayPost />}></Route>

						<Route
							path="/post"
							element={<DisplaySinglePost />}
						></Route>

						{token && (
							<Route path="/logout" element={<Logout />}></Route>
						)}
						<Route path="/login" element={<Login />}></Route>
						<Route path="/signup" element={<Signup />}></Route>
						{/* <Route
							path="/post/:postId"
							element={<SinglePost />}
						></Route> */}
					</Routes>
				</PostContext.Provider>
			</Router>
		</LoginContext.Provider>
	);
}

export default App;
