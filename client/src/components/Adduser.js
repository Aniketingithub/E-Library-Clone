import React, { useState } from "react";
import Image from "./user.jpg";

const Adduser = () => {
	const myStyle = {
		boxShadow: "10px 10px 5px grey",
	};
	const boxstyle = {
		borderRadius: "5px",
		border: "2px solid gray",
		boxShadow: "5px 5px 5px grey",
	};
	const [user, setuser] = useState({
		Name: "",
		Phone: "",
		Address: "",
	});
	let name, value;
	const handleuser = (e) => {
		name = e.target.name;
		value = e.target.value;
		setuser({ ...user, [name]: value });
	};
	const postuser = async (e) => {
		e.preventDefault();
		const { Name, Phone, Address } = user;
		const data = await fetch("/adduser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ Name, Phone, Address }),
		});
		if(!data || data.status === 404) {
			window.alert("Please fill all the details.");
		} else if (data.status === 208) {
			window.alert("User Already Exists");
		} else {
			window.alert("User added successfully");
		}
	};
	return (
		<div className="container" style={{ marginTop: "100px" }}>
			<div className="row">
				<div className="col-5" style={boxstyle}>
					<div className="mb-4" style={{ fontSize: "30px" }}>
						Add a New User
					</div>
					<form>
						<div className="mb-3">
							<i className="fa fa-user fa-lg"></i>
							<label
								className="form-label"
								style={{ marginLeft: "10px", fontSize: "17px" }}
							>
								Name
							</label>
							<input
								name="Name"
								value={user.Name}
								onChange={handleuser}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<i className="fa fa-phone fa-lg"></i>
							<label
								className="form-label"
								style={{ marginLeft: "10px", fontSize: "17px" }}
							>
								Phone no.
							</label>
							<input
								name="Phone"
								value={user.Phone}
								onChange={handleuser}
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<i className="fa fa-bookmark fa-lg"></i>
							<label
								className="form-label"
								style={{ marginLeft: "10px", fontSize: "17px" }}
							>
								Address
							</label>
							<input
								name="Address"
								value={user.Address}
								onChange={handleuser}
								className="form-control"
							/>
						</div>
						<div className="d-grid">
							<button type="submit" className="btn btn-warning" onClick={postuser}>
								Add User
							</button>
						</div>
					</form>
				</div>
				<img className="img-responsive col-7" src={Image} style={myStyle} />
			</div>
		</div>
	);
};

export default Adduser;
