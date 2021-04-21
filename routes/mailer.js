const { Router } = require("express");
const { sendProcess } = require("../controllers/mailer");

const router = Router();

router.post("/", sendProcess)

module.exports = router;