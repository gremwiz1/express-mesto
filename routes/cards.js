const router = require("express").Router();

const { getCards, createCard, deleteCard } = require("../controllers/cards");

router.post("/cards", createCard);
router.get("/cards", getCards);
router.delete("/cards/:cardId", deleteCard);
module.exports = router;
