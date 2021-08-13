const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { isURL } = require("validator");

const method = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new Error("URL validation err");
};
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require("../controllers/cards");

router.post("/api/cards", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(method),
  }),
}), createCard);
router.get("/api/cards", getCards);
router.delete("/api/cards/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);
router.put("/api/cards/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);
router.delete("/api/cards/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);
module.exports = router;
