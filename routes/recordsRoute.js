const express = require("express");
const router = express.Router();
const {
  getAllRecords,
  postAddNewRecord,
  putUpdateRecord,
  deleteSingleRecord,
  getSingleRecord,
} = require("../controllers/recordsController");
const db = require("../model/db");

router.get("/", getAllRecords);
router.post("/", postAddNewRecord);
router.put("/:id", putUpdateRecord);
router.delete("/:id", deleteSingleRecord);
router.get("/:id", getSingleRecord);

module.exports = router;
