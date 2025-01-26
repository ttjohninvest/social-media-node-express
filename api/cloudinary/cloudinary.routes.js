/* eslint-disable no-undef */
const express = require("express");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const router = express.Router();

router.post("/signature", (req, res) => {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const uploadPreset = "social_n_shlomi";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset: uploadPreset },
      process.env.CLOUD_API_SECRET
    );

    res.json({ signature, timestamp, uploadPreset });
  } catch (err) {
    console.error("Error generating signature:", err.message);
    res.status(500).send("Failed to generate signature");
  }
});

router.post("/upload", async (req, res) => {
  try {
    const { file, resourceType } = req.body;
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
