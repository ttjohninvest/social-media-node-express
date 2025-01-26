/* eslint-disable no-undef */
const express = require("express");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { file, resourceType } = req.body;

    if (!file) {
      return res.status(400).send("No file provided");
    }

    const uploadPreset = "social_n_shlomi";

    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType || "auto",
      upload_preset: uploadPreset,
      moderation: "webpurify",
    });

    res.json(result);
  } catch (err) {
    console.error("Error uploading file:", err.message);
    res.status(500).send("Failed to upload file");
  }
});

module.exports = router;
