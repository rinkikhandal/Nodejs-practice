const express = require("express");
const tasks = require("./routes/tasks.js");
const connectDb = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/not-found.js");
const errorHandelerMiddleware = require("./middleware/error-handeler.js");

const app = express();

app.use(express.json());

app.use(express.static("./public"));

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandelerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`the server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
