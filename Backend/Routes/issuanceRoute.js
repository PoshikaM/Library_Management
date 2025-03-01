const express = require("express");
const router = express.Router();
const issuanceController = require("../Controllers/issuanceController");

router.post("/", issuanceController.createIssuance);
router.get("/", issuanceController.getIssuance);
router.get("/:id", issuanceController.getIssuanceById);
router.put("/:id", issuanceController.updateIssuance);
router.delete("/:id", issuanceController.deleteIssuance);

module.exports = router;