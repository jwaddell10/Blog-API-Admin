import { Link, Outlet } from "react-router-dom";

function NavBar() {
	const token = localStorage.getItem("JWT Token");

	return (
		<>
			<nav className="navbar">
				<h1>BlogAPI</h1>
				<ul>
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/post">
						<li>All Blogs</li>
					</Link>
					<Link to="/about">
						<li>About</li>
					</Link>
					{token ? (
						<>
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						</>
					) : (
						<Link to="/login">
							<li>Login</li>
						</Link>
					)}
					<Link to="/signup">
						<li>Signup</li>
					</Link>
				</ul>
				<Outlet />
			</nav>
		</>
	);
}

export default NavBar;
