const db = require("../model/db");

exports.getAllRecords = (req, res, next) => {
  let allRecords = db.get("records").value();
  res.send({ allRecords });
};

exports.postAddNewRecord = (req, res, next) => {
  console.log(req.body);
  db.get("records")
    .push(req.body)
    .last()
    .assign({ id: new Date().getTime().toString() })
    .write();
  res.send("NEW record added into database");
};

exports.putUpdateRecord = (req, res, next) => {
  const { id } = req.params;
  db.get("records").find({ id }).assign(req.body).write();

  res.send("record updated");
};

exports.deleteSingleRecord = (req, res, next) => {
  const { id } = req.params;
  let record = db.get("records").find({ id }).value();
  if (record) {
    db.get("records").remove({ id }).write();
    res.send("record deleted");
  } else {
    let error = new Error("no such record found in database");
    error.status = 404;
    next(error);
  }
};

exports.getSingleRecord = (req, res, next) => {
  const { id } = req.params;
  let singleRecord = db.get("records").find({ id }).value();
  res.status(200).json({ success: true, record: singleRecord });
};

//CRUD operation
//RESTful API  representational state transfer
