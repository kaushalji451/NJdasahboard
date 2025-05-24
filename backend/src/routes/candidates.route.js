const express = require("express");
const candidatesRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const { CandidateModel } = require("../models/candidates");
const dotenv = require("dotenv");
const Candidates = CandidateModel;
connectDb();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // optional folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage: storage });
dotenv.config();

candidatesRoute.get("/", async (req, res) => {
  try {
    const data = await Candidates.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.get("/search", async (req, res) => {
  try {
    let { name } = req.query;
    let data = await Candidates.find({
      Name: { $regex: name, $options: "i" },
    });
    res.json({ message: "done", data });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
});

candidatesRoute.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Candidates.findById(id);
    if (data != null) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "No user found" });
  }
});

candidatesRoute.post("/", upload.single("image"), async (req, res) => {
  let imageUrl = req.file.path;
  let { Name, EmailId, AiRating, AppliedOn, Tag } = req.body;
  try {
    let data = await Candidates.create({
      Name,
      EmailId,
      image: imageUrl,
      AiRating,
      AppliedOn,
      Tag,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { Name, EmailId, AiRating, AppliedOn, Tag } = req.body;
  try {
    let data = await Candidates.findByIdAndUpdate(id, {
      Name,
      EmailId,
      AiRating,
      AppliedOn,
      Tag,
    });
    if (data != null) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Candidates.findByIdAndDelete(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

candidatesRoute.patch("/bulk-update", async (req, res) => {
  const { ids, status } = req.body;
  try {
    const result = await Candidates.updateMany(
      { _id: { $in: ids } },
      { $set: { Status: status } }
    );
    res.status(200).json({ message: "Bulk update successful", result });
  } catch (error) {
    console.error("Error in bulk update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = candidatesRoute;
module.exports = candidatesRoute;

