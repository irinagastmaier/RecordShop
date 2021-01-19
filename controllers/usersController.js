const db = require("../model/db");

exports.getAllUsers = (req, res, next) => {
  let allUsers = db.get("users").value();
  res.send({ allUsers });
};

exports.postAddNewUser = (req, res, next) => {
  console.log(req.body);
  db.get("users").push(req.body).last().assign({id: new Date().getTime().toString()}).write();
  res.send("new user added into database");
};

exports.putUpdateUser = (req, res, next) => {
  const { id } = req.params;
  db.get("users").find({ id }).assign(req.body).write();

  res.send("user updated");
};

exports.deleteSingleUser = (req, res, next) => {
  const { id } = req.params;
  let user = db.get("users").find({ id }).value();
  if (user) {
    db.get("users").remove({ id }).write();
    res.send("user deleted");
  } else {
    let error = new Error("no such user was found in the database");
    error.status = 404;
    next(error);
  }
};

exports.getSingleUser = (req, res, next) => {
  const { id } = req.params;
  let singleUser = db.get("users").find({ id }).value();
  res.status(200).json({ success: true, user: singleUser });
};
