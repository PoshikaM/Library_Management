const express = require("express");
const router = express.Router();
const memberController = require("../Controllers/memberController");

router.post("/", memberController.createMember);
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMemberById);
router.put("/:id", memberController.updateMember);

module.exports = router;