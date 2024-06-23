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
					<Link reloadDocument to="/post">
						<li>All Blogs</li>
					</Link>
					{token ? (
						<>
							<li>
								<Link reloadDocument to="/logout">Logout</Link>
							</li>
						</>
					) : (
						<Link reloadDocument to="/login">
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
