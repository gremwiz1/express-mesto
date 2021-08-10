const router = require("express").Router();

router.use("/*", (req, res) => {
  res.status(404).send({ message: "Такой страницы не существует" });
});
module.exports = router;
