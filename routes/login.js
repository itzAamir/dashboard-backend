const router = require("express").Router();
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ status: "error", error: "Missing required fields" });
		}

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ status: "error", error: "Invalid email or password" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res
				.status(400)
				.json({ status: "error", error: "Invalid email or password" });
		}

		const token = jwt.sign(
			{
				id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1week" }
		);

		res.json({ status: "success", data: token });
	} catch (error) {
		res.json({ status: "error", error });
	}
});

module.exports = router;
