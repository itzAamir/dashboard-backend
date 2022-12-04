const router = require("express").Router();
const UserModel = require("../models/user");
const generteHashedPassword = require("../helpers/generateHashedPassword");
const validateUser = require("../helpers/validateUser");

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		res.json({ status: "success", data: user });
	} catch (error) {
		res.json({ status: "error", error });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { first_name, last_name, email, password } = req.body;
		const { isValid, error } = validateUser(req.body);
		if (!isValid) {
			return res.status(400).json({ status: "error", error });
		}

		const hashedPassword = await generteHashedPassword(password);

		const user = await UserModel.findByIdAndUpdate(
			id,
			{
				first_name,
				last_name,
				email,
				password: hashedPassword,
			},
			{ new: true }
		);
		res.json({ status: "success", data: user });
	} catch (error) {
		res.json({ status: "error", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserModel.findByIdAndDelete(id);
		res.json({ status: "success", data: user });
	} catch (error) {
		res.json({ status: "error", error });
	}
});

module.exports = router;
