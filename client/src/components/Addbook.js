import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./book1.jpg";

const Addbook = () => {
	const navigate = useNavigate();
	const myStyle = {
		// marginLeft: "10px",
		boxShadow: "5px 5px 5px grey",
	};
	const boxstyle = {
		borderRadius: "5px",
		border: "2px solid gray",
		boxShadow: "5px 5px 5px grey",
	};
	const [book, setbook] = useState({
		book_id: "",
		title: "",
		Type: "",
		price: "",
	});
	let name, value;
	const handleBook = (e) => {
		name = e.target.name;
		value = e.target.value;
		setbook({ ...book, [name]: value });
	};
	const postbook = async (e) => {
		e.preventDefault();
		const { book_id, title, Type, price } = book;
		const bookData = await fetch("/addbook", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ book_id, title, Type, price }),
		});
		if (bookData.status === 422 || !bookData) {
			window.alert("Book Exists");
		} else {
			window.alert("Book added successfully.");
		}
		navigate("/");
	};
	return (
		<>
			<div className="container" style={{ marginTop: "100px" }}>
				<div className="row">
					<div className="col-5" style={boxstyle}>
						<div className="mb-4" style={{ fontSize: "30px" }}>
							Add a New Book
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
									value={book.book_id}
									onChange={handleBook}
									className="form-control"
									aria-describedby="emailHelp"
								/>
							</div>
							<div className="mb-3">
								<i className="fa fa-book fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Title of the Book.
								</label>
								<input
									name="title"
									value={book.title}
									onChange={handleBook}
									className="form-control"
									aria-describedby="emailHelp"
								/>
							</div>
							<div className="mb-3">
								<i className="fa fa-bookmark fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Type of book
								</label>
								<input
									name="Type"
									value={book.Type}
									onChange={handleBook}
									className="form-control"
								/>
							</div>
							<div className="mb-3">
								<i className="fa fa-rupee-sign fa-lg"></i>
								<label
									className="form-label"
									style={{ marginLeft: "10px", fontSize: "17px" }}
								>
									Price of book
								</label>
								<input
									name="price"
									value={book.price}
									onChange={handleBook}
									className="form-control"
								/>
							</div>
							<div className="d-grid">
								<button
									type="submit"
									className="btn btn-warning"
									onClick={postbook}
								>
									Add Book
								</button>
							</div>
						</form>
					</div>
					<img className="img-responsive col-7" src={Book} style={myStyle} />
				</div>
			</div>
		</>
	);
};

export default Addbook;
