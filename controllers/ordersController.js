const db = require("../model/db");

exports.getAllOrders = (req, res, next) => {
  let allOrders = db.get("orders").value();
  res.send({ allOrders });
};

exports.postAddNewOrder = (req, res, next) => {
  console.log(req.body);
  db.get("orders")
    .push(req.body)
    .last()
    .assign({ record_id: new Date().getTime().toString() })
    .write();
  res.send("new order added into database");
};

exports.putUpdateOrder = (req, res, next) => {
  const { record_id } = req.params;
  db.get("orders").find({ record_id }).assign(req.body).write();

  res.send("order updated");
};

exports.deleteSingleOrder = (req, res, next) => {
  const { record_id } = req.params;
  let order = db.get("orders").find({ record_id }).value();
  if (order) {
    db.get("orders").remove({ record_id }).write();
    res.send("order deleted");
  } else {
    let error = new Error("no such order found in database");
    error.status = 404;
    next(error);
  }
};

exports.getSingleOrder = (req, res, next) => {
  const { record_id } = req.params;
  let singleOrder = db.get("orders").find({ record_id }).value();
  res.status(200).json({ success: true, order: singleOrder });
};
