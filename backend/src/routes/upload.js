import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided"
      });
    }

    // Save to gallery.json
    const galleryFilePath = path.join(__dirname, "../data/gallery.json");
    let galleryData = [];
    
    if (fs.existsSync(galleryFilePath)) {
      const fileContent = fs.readFileSync(galleryFilePath, "utf8");
      if (fileContent.trim()) {
        galleryData = JSON.parse(fileContent);
      }
    }
    
    // req.file.path is the Cloudinary URL when using CloudinaryStorage
    galleryData.push({
      url: req.file.path,
      publicId: req.file.filename || req.file.public_id,
      timestamp: Date.now()
    });
    
    fs.writeFileSync(galleryFilePath, JSON.stringify(galleryData, null, 2), "utf8");

    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: req.file.path,
    });
  } catch (error) {
    console.error("Error in upload:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload image"
    });
  }
});

export default router;
