const validateUser = (user) => {
	const { first_name, last_name, email, password } = user;
	if (!first_name || !last_name || !email || !password) {
		return { isValid: false, error: "Missing required fields" };
	}
	if (password.length < 6) {
		return {
			isValid: false,
			error: "Password must be at least 6 characters long",
		};
	}

	const emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailFilter.test(email)) {
		return {
			isValid: false,
			error: "Invalid email address",
		};
	}

	return { isValid: true, error: null };
};

module.exports = validateUser;
