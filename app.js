const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const errorsRouter = require("./routes/errors");
const errorsMiddlewares = require("./middlewares/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post("/signin", login);
app.post("signup", createUser);
app.use(auth);
app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use("*", errorsRouter);
app.use(errorsMiddlewares);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
