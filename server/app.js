const express = require("express");
const app = express();
const { Books, Students } = require("./db/conn");
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello");
});

// add a new book
app.post("/addbook", async (req, res) => {
	const { book_id, title, Type, price } = req.body;
	if (!book_id || !title || !Type || !price) {
		return res.status(422).send("Plz fill all details");
	}
	try {
		const bookData = await Books.findOne({ book_id: book_id });
		if (bookData) {
			return res.status(422).send("Book already present");
		}
		const book = new Books({ book_id, title, Type, price });
		await book.save();
		res.status(200).send("Book added successfully");
	} catch (e) {
		res.status(404).send("book not added to library");
	}
});

// add a new user
app.post("/adduser", async (req, res) => {
	const { Name, Phone, Address } = req.body;
	if (!Name || !Phone || !Address) {
		return res.status(404).send("Plz fill all details");
	}
	try {
		const addstudent = await Students.findOne({ Phone: Phone });
		if (addstudent) {
			return res.status(208).send("User Already Exists");
		} else {
			const user = new Students({ Name, Phone, Address });
			await user.save();
			res.status(200).send("User added successfully");
		}
		await addstudent.save();
		res.status(200).send("User added successfully !!!");
	} catch (error) {
		res.status(404).send("error creating user.");
	}
});

// issue a book
app.post("/issue", async (req, res) => {
	const { book_id, Name, Phone } = req.body;
	if (!book_id || !Name || !Phone) {
		return res.status(404).send("please enter all details");
	}
	const findBook = await Books.findOne({ book_id: book_id });
	const findUser = await Students.findOne({ Phone: Phone });
	if (!findBook || findBook.issued === 1) {
		return res.status(208).send("Book is not available now");
	}
	if (!findUser) {
		return res
			.status(422)
			.send("User not found. Please register the User to continue.");
	}
	const updateBook = await Books.updateOne(
		{ book_id: book_id },
		{ $set: { issued: 1 } }
	);
	try {
		const User = await Students.updateOne(
			{ Phone: Phone },
			{
				$push: {
					books_issued: {
						Book_id: book_id,
						title: findBook.title,
					},
				},
			}
		);
		res.status(200).send("Book issued.");
	} catch (e) {
		console.log(e);
	}
});

// return book
app.post("/return", async (req, res) => {
	const { book_id, Phone } = req.body;
	try {
		await Books.updateOne({ book_id: book_id }, { $set: { issued: 0 } });
		await Students.updateOne(
			{ Phone: Phone },
			{
				$pull: {
					books_issued: {
						Book_id: book_id,
					},
				},
			}
		);
		res.status(200).send("Book returned successfully");
	} catch (e) {
		res.status(404).send("error");
	}
});

app.get("/userdetails", async (req, res) => {
	const { Phone } = req.body;
	const findUser = await Students.findOne({ Phone: Phone });
	if(!findUser) {
		return res.status(404).send("User not found");
	}
	try {
		const booksIssued = findUser.books_issued;
		res.status(200).send(booksIssued);
	} catch (e) {
		res.status(404).send("error");
	}
});

// connection
app.listen(5000, () => {
	console.log(`server is runnig at port no 5000`);
});
