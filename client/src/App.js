import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Users from "./components/Users";
import Addbook from "./components/Addbook";
import Adduser from "./components/Adduser";
import Issue from "./components/Issue";
import Home from "./components/Home";
import Return from "./components/Return";
import UserDetails from "./components/UserDetails";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/addbook" element={<Addbook />} />
				<Route path="/adduser" element={<Adduser />} />
				<Route path="/issue" element={<Issue />} />
				<Route path="/return" element={<Return />} />
				<Route path="/userdetails" element={<UserDetails />} />
			</Routes>
		</>
	);
};

export default App;
