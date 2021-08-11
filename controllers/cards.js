const Card = require("../models/card");

const checkErrorResponse = (res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(400).send({ message: `Переданы не корректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Ошибка на сервере: ${err}` });
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => checkErrorResponse(res, err));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => checkErrorResponse(res, err));
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error("NotValidIdCard"))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === "NotValidIdCard") return res.status(404).send({ message: "Карточки с таким id не существует" });
      return checkErrorResponse(res, err);
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error("NotValidIdCard"))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === "NotValidIdCard") return res.status(404).send({ message: "Переданы некорректные данные для постановки лайка" });
      return checkErrorResponse(res, err);
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error("NotValidIdCard"))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === "NotValidIdCard") return res.status(404).send({ message: "Переданы некорректные данные для снятии лайка" });
      return checkErrorResponse(res, err);
    });
};
