import { Router } from "express";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please select a file.",
    });
  }

  // For demonstration only: the file is currently in memory.
  // Next, send it to private storage and save metadata in SQL Server.

  res.status(201).json({
    success: true,
    message: "File received successfully.",
    file: {
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
    },
  });
});

export default router;
