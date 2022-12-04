const router = require("express").Router();
const authenticateUser = require("../middlewares/auth");

router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/users", authenticateUser, require("./users"));
router.use("/user", authenticateUser, require("./user"));

module.exports = router;
