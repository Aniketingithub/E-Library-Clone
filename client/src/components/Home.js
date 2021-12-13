import React from "react";
const Home = () => {
	return (
		<>
			<div className="container" style={{ marginTop: "100px" }}>
				<div className="row">
					<div className="col" style={{ textAlign: "center" }}>
						<h1
							style={{
								fontSize: "80px",
								marginBottom: "40px",
							}}
						>
							Welcome to Book Store.
						</h1>
						<p style={{ fontSize: "25px", marginBottom: "30px" }}>
							You just landed to the right place.
							<br />
							Here you will be provided with variety of books of different
							authors.
						</p>
						<hr style={{ marginBottom: "50px" }} />
						<a
							class="btn btn-lg btn-outline-primary"
							href="/issue"
							role="button"
						>
							Issue Book
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
