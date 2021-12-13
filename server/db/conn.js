const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/online_book_store", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected backend");
	})
	.catch((err) => console.log(err));

const books = new mongoose.Schema({
	book_id: Number,
	title: {
		type: String,
		required: true,
	},
	Type: String,
	price: Number,
	issued: {
		type: Number,
		default: 0,
	},
});

const students = new mongoose.Schema({
	Name: String,
	Phone: Number,
	Address: String,
	books_issued: [
		{
			Book_id: Number,
			title: String,
		},
	],
});

const Students = new mongoose.model("student", students);
const Books = new mongoose.model("book", books);

module.exports = { Books, Students };
