const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require("../controllers/cards");

router.post("/cards", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/(www\.)?[\w-._~:/?#[\]@!$&'()*+,;=%]+#?$/i)),
  }),
}), createCard);
router.get("/cards", getCards);
router.delete("/cards/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);
router.put("/cards/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);
router.delete("/cards/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);
module.exports = router;
