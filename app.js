/* EXTERNAL MODULES */
const express = require("express");
const morgan = require("morgan");
const indexRoute = require("./routes/indexRoute");
const recordsRoute = require("./routes/recordsRoute");
const usersRoute = require("./routes/usersRoute");
const ordersRoute = require("./routes/ordersRoute")

/* INIT : creating express server*/
const app = express();

/* in express all the controllers are the middlewares */

/* USE MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.json());

/* ROUTES */
app.use("/", indexRoute);
app.use("/records", recordsRoute);
app.use("/users", usersRoute);
app.use("/orders", ordersRoute)

/* ERROR HANDLING */
app.use((req, res, next) => {
  let error = new Error("No such route found");
  console.log(error.message);
  error.status = 404;
  next(error);
});

//UNIVERSAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

/* LISTENING PORT */
app.listen(3000, () => console.log("server is running"));

/* MVC modal views controller (pattern) */
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
