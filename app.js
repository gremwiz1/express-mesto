const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const errorsRouter = require("./routes/errors");
const { login, createUser } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: "61112aa60ff51f5f840aa095",
  };

  next();
});
app.post("/signin", login);
app.post("signup", createUser);
app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use("*", errorsRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
