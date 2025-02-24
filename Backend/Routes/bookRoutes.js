const express = require("express");
const router = express.Router();
const bookController = require("../Controllers/bookController");

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);

module.exports = router;