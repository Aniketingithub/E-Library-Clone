import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav
				className="navbar fixed-top navbar-expand-md navbar-light "
				style={{ backgroundColor: "#e3f2fd" }}
			>
				<div className="container-fluid">
					<NavLink id="navb" className="navbar-brand" to="/">
						Book Store
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse d-md-flex justify-content-md-end"
						id="navbarNavAltMarkup"
					>
						<div id="nabc" className="navbar-nav">
							<NavLink className="nav-link me-md-2" to="/addbook">
								Add Book
							</NavLink>
							<NavLink className="nav-link me-md-2" to="/adduser">
								New User
							</NavLink>
							<NavLink className="nav-link me-md-2" to="/issue">
								Issue Book
							</NavLink>
							<NavLink className="nav-link me-md-2" to="/return">
								Return Book
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
