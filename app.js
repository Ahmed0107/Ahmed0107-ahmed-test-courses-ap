require("dotenv").config();

const express = require("express");
const app = express();

const helmet = require("helmet");
const morgan = require("morgan");

//Require routes
const courseRouter = require("./routes/coursesRoute");
const mainPageRouter = require("./routes/mainPageRouter");

//Require Middlewares
const logger = require("./middlewares/logger");
const authenticating = require("./middlewares/authenticating");

//Builtin Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.use(helmet());

//Check the environment (development or production)
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log('morgan enabled...');
}

//Custom Middlewares
app.use(logger);
app.use(authenticating);

//Routing Middlewares
app.use("/", mainPageRouter);
app.use('/api/courses', courseRouter)

//Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is lestining to ${PORT}.....`));
