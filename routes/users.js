const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { isURL } = require("validator");
const {
  getUsers, getUser, updateUser, updateAvatar, getInfoAboutMe,
} = require("../controllers/users");

const method = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new Error("URL validation err");
};
router.get("/api/users", getUsers);
router.get("/api/users/me", getInfoAboutMe);
router.get("/api/users/:userId", celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);
router.patch("/api/users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch("/api/users/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method),
  }),
}), updateAvatar);
module.exports = router;
