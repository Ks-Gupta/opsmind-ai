const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  console.log("🔥 UPLOAD HIT");

  if (!req.file) {
    return res.status(400).json({ error: "No file" });
  }

  res.status(200).json({
    ok: true,
    filename: req.file.originalname,
    size: req.file.size
  });
});

module.exports = router;
