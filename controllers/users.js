const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkErrorResponse = (res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(400).send({ message: `Переданы не корректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Ошибка на сервере: ${err}` });
};
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((customer) => {
      if (customer) {
        return Promise.reject(new Error("EmailIsExist"));
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, about, avatar, email, password: hash,
          });
        })
        .then((user) => res.status(200).send({ user }))
        .catch((err) => {
          if (err.message === "EmailIsExist") return res.status(409).send({ message: "Пользователь с таким email уже существует в базе" });
          return checkErrorResponse(res, err);
        });
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Ошибка на сервере: ${err}` }));
};
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotValidIdUser"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidIdUser") return res.status(404).send({ message: "Нет пользователя с таким id" });
      return checkErrorResponse(res, err);
    });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate(req.params.userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error("NotValidIdUser"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidIdUser") return res.status(404).send({ message: "Нет пользователя с таким id" });
      return checkErrorResponse(res, err);
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error("NotValidIdUser"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidIdUser") return res.status(404).send({ message: "Нет пользователя с таким id" });
      return checkErrorResponse(res, err);
    });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        "some-secret-key",
        { expiresIn: "7d" },
      );
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "IncorrectEmailOrPassword") return res.status(401).send({ message: "Неправильная почта или пароль" });
      return checkErrorResponse(res, err);
    });
};
module.exports.getInfoAboutMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") return res.status(400).send({ message: "Некорректный id пользователя" });
      return checkErrorResponse(res, err);
    });
};
