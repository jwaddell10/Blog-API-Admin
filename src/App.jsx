import {
	createBrowserRouter,
	RouterProvider,
	BrowserRouter as Router,
} from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import DisplayPost from "./components/DisplayPost.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Signup from "./components/Signup.jsx";
import FetchPost from "./components/FetchPost.jsx";

export const LoginContext = createContext(null);

function App() {
	const {blogPosts, setBlogPosts} = FetchPost();

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [postId, setPostId] = useState(null);

	const updatePostId = (postId) => {
		setPostId(postId);
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: <NavBar />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "/post",
					element: (
						<DisplayPost
							blogPosts={blogPosts}
							postId={postId}
							onStateChange={updatePostId}
						/>
					),
				},
				{
					path: "/post/:postId",
					element: <DisplayPost />,
				},
				{
					path: "/signup",
					element: <Signup />,
				},
				{
					path: "/login",
					element: (
						<LoginContext.Provider
							value={{ isUserLoggedIn, setIsUserLoggedIn }}
						>
							<Login />
						</LoginContext.Provider>
					),
				},
				{
					path: "/logout",
					element: (
						<LoginContext.Provider
							value={{ isUserLoggedIn, setIsUserLoggedIn }}
						>
							<Logout />{" "}
						</LoginContext.Provider>
					),
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
