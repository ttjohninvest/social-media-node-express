const express = require("express");
const cloudinary = require("cloudinary").v2;
const vision = require("@google-cloud/vision");

cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.CLOUD_NAME,
  // eslint-disable-next-line no-undef
  api_key: process.env.CLOUD_API_KEY,
  // eslint-disable-next-line no-undef
  api_secret: process.env.CLOUD_API_SECRET,
});

const client = new vision.ImageAnnotatorClient({
  credentials: {
    // eslint-disable-next-line no-undef
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    // eslint-disable-next-line no-undef
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  // eslint-disable-next-line no-undef
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const router = express.Router();

const analyzeImage = async (imageBase64) => {
  try {
    const cleanedBase64 = imageBase64.split(",")[1];

    const [result] = await client.safeSearchDetection({
      image: { content: cleanedBase64 },
    });

    const detections = result.safeSearchAnnotation;
    return {
      adult: detections.adult,
      violence: detections.violence,
      racy: detections.racy,
    };
  } catch (error) {
    console.error("Error analyzing image:", error.message);
    throw error;
  }
};

router.post("/upload", async (req, res) => {
  try {
    const { file, resourceType } = req.body;

    if (!file) {
      console.error("No file provided");
      return res.status(400).send("No file provided");
    }

    const analysis = await analyzeImage(file);

    if (
      analysis.adult === "LIKELY" ||
      analysis.adult === "VERY_LIKELY" ||
      analysis.violence === "LIKELY" ||
      analysis.violence === "VERY_LIKELY"
    ) {
      return res.status(400).send("The image contains inappropriate content.");
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
