const express = require("express");
const router = express.Router();
const { getAllUsers, postAddNewUser, putUpdateUser, deleteSingleUser, getSingleUser } = require("../controllers/usersController");
const db = require("../model/db");

router.get("/", getAllUsers);
router.post("/", postAddNewUser);
router.put("/:id", putUpdateUser);
router.delete("/:id", deleteSingleUser);
router.get("/:id", getSingleUser);

module.exports = router;
