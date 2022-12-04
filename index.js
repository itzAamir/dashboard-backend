require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dbConnector = require("./helpers/connectDB");

// Connect to DB
dbConnector();

app.use(express.json());
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
	res.json({ status: "Working" });
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
