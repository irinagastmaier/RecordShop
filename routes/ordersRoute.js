const express = require("express");
const router = express.Router();
const { getAllOrders, postAddNewOrder, putUpdateOrder, deleteSingleOrder, getSingleOrder } = require("../controllers/ordersController");
const db = require("../model/db");

router.get("/", getAllOrders);
router.post("/", postAddNewOrder);
router.put("/:id", putUpdateOrder);
router.delete("/:id", deleteSingleOrder);
router.get("/:id", getSingleOrder);

module.exports = router;
