const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev-key");
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
