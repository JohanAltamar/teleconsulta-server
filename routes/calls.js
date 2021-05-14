const { Router } = require("express");
const { getReport, registerCall } = require("../controllers/calls");

const router = Router();

router.post("/new", registerCall);

router.get("/report", getReport)

module.exports = router;