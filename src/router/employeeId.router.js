const express = require("express");
const employeeIdController = require("../controller/employeeId.controller");

const router = express.Router();

router.get("/employee-ids", employeeIdController.index);

router.post("/employee-ids", employeeIdController.addEmployeeId);

module.exports = router;
