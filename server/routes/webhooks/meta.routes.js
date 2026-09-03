const express = require("express");
const router = express.Router();

const metaController = require("../../controllers/webhooks/meta.controller.js");

router.get("/", metaController.verify);
// router.post("/", metaController.receive);

module.exports = router;
