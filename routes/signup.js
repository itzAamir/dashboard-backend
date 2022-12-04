const router = require("express").Router();
const generateHashedPassword = require("../helpers/generateHashedPassword");
const validateUser = require("../helpers/validateUser");
const UserModel = require("../models/user");

router.post("/", async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;
		const { isValid, error } = validateUser(req.body);
		if (!isValid) {
			return res.status(400).json({ status: "error", error });
		}
		const hashedPassword = await generateHashedPassword(password);
		const user = new UserModel({
			first_name,
			last_name,
			email,
			password: hashedPassword,
		});
		const result = await user.save();
		res.json({ status: "success", data: result });
	} catch (error) {
		res.json({ status: "error", error: error.message });
	}
});

module.exports = router;
