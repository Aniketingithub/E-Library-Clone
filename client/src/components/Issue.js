import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Issue = () => {
	const boxstyle = {
		height: "400px",
		borderRadius: "5px",
		border: "2px solid gray",
		boxShadow: "5px 5px 5px grey",
	};
	const navigate = useNavigate();
	const [details, setdetails] = useState({
		book_id: "",
		Name: "",
		Phone: "",
	});
	let name, value;
	const handlebook = (e) => {
		name = e.target.name;
		value = e.target.value;
		setdetails({ ...details, [name]: value });
	};
	const postbook = async (e) => {
		e.preventDefault();
		const { book_id, Name, Phone } = details;
		const data = await fetch("/issue", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ book_id, Name, Phone }),
		});
		if (!data || data.status === 404) {
			window.alert("Please fill all the details.");
		} else if (data.status === 208) {
			window.alert("Book not found.");
			navigate("/addbook");
		} else if (data.status === 422) {
			window.alert("User not registered.");
			navigate("/adduser");
		} else {
			window.alert(`Book issued to ${Name}`);
			navigate("/");
		}
	};
	return (
		<>
			<div className="container" style={{ marginTop: "100px" }}>
				<div className="row">
					<div className="col-8 mx-auto" style={boxstyle}>
						<div className="mb-4 col-8 mx-auto" style={{ fontSize: "30px" }}>
							Enter the required Details here.
						</div>
						<form method="POST">
							<div className="mb-3">
								<i className="fa fa-address-book fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Book ID
								</label>
								<input
									name="book_id"
									value={details.book_id}
									onChange={handlebook}
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<i className="fa fa-user fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Name of Issuer
								</label>
								<input
									name="Name"
									value={details.Name}
									onChange={handlebook}
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<i className="fa fa-phone fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Phone No.
								</label>
								<input
									name="Phone"
									value={details.Phone}
									onChange={handlebook}
									className="form-control"
								/>
							</div>
							<div className="d-grid col-6 mx-auto">
								<button
									type="submit"
									className="btn btn-warning"
									onClick={postbook}
								>
									Issue the Book
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Issue;
