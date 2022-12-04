const bcrypt = require("bcryptjs");

const generateHashedPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

module.exports = generateHashedPassword;
