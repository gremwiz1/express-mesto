const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send(err));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.params.userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};
