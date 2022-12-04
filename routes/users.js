const router = require("express").Router();
const userModel = require("../models/user");

router.get("/", async (req, res) => {
	try {
		const users = await userModel.find();
		res.json({ status: "success", data: users });
	} catch (error) {
		res.json({ status: "error", error });
	}
});

module.exports = router;
