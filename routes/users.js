const router = require("express").Router();
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);
module.exports = router;
