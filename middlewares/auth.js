const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res
			.status(401)
			.json({ status: "error", error: "Unauthorized Request" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, process.env.JWT_SECRET, (error) => {
		if (error) {
			return res
				.status(401)
				.json({ status: "error", error: "Unauthorized Request" });
		}
		next();
	});
};

module.exports = authenticateUser;
