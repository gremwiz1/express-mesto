const router = require("express").Router();
const { createUser, getUsers, getUser } = require("../controllers/users");

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:userId", getUser);
module.exports = router;
