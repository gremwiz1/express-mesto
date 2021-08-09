const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const usersRouter = require("./routes/users");

app.use((req, res, next) => {
  req.user = {
    _id: "61112aa60ff51f5f840aa095",
  };

  next();
});
app.use("/", usersRouter);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})