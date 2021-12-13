import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Return = () => {
    const navigate = useNavigate();
	const boxstyle = {
		borderRadius: "5px",
		border: "2px solid gray",
		boxShadow: "5px 5px 5px grey",
	};
	const [retbook, setretbook] = useState({ book_id: "", Phone: "" });
	let name, value;
	const handlebook = (e) => {
		name = e.target.name;
		value = e.target.value;
		setretbook({ ...retbook, [name]: value });
	};
	const postbook = async (e) => {
		e.preventDefault();
		const { book_id, Phone } = retbook;
		const data = await fetch("/return", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ book_id, Phone }),
		});
		if (!data || data.status === 404) {
			window.alert("Invalid Details");
			setretbook({ book_id: "", Phone: "" });
		} else {
			window.alert("Book returned successfully");
            navigate("/");
		}
	};
	return (
		<div className="container" style={{ marginTop: "100px" }}>
			<div className="row">
				<div className="col" style={boxstyle}>
					<div
						className="mb-4"
						style={{ fontSize: "30px", textAlign: "center" }}
					>
						Enter the following details.
					</div>
					<form>
						<div className="mb-3">
							<i className="fa fa-book fa-lg"></i>
							<label
								className="form-label"
								style={{ marginLeft: "10px", fontSize: "17px" }}
							>
								Book ID
							</label>
							<input
								name="book_id"
								value={retbook.book_id}
								onChange={handlebook}
								className="form-control"
							/>
						</div>
						<div className="mb-3 mt-5">
							<i className="fa fa-phone fa-lg"></i>
							<label
								className="form-label"
								style={{ marginLeft: "10px", fontSize: "17px" }}
							>
								Phone no.
							</label>
							<input
								name="Phone"
								value={retbook.Phone}
								onChange={handlebook}
								className="form-control"
							/>
						</div>
						<div className="d-grid col-6 mx-auto mt-5 mb-5">
							<button
								type="submit"
								className="btn btn-warning"
								onClick={postbook}
							>
								Return Book
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Return;
