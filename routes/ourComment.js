const express = require("express");
const router = express.Router();
const upload = require("../upload");
const ourComment = require("../models/ourComment");

router.get("/", async (req, res) => {
  try {
    const ourComments = await ourComment.find({});
    res.status(200).json(ourComments);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ourComment = await ourComment.findById(req.params.id);
    res.status(200).json(ourComment);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { imageAlt } = req.body;
    const { imageSrc } = req.file ? req.file.path : "";
    const image = new ourComment({
      imageSrc,
      imageAlt,
    });
    if (req.file) {
      image.imageSrc = req.file.path;
    }
    await image.save();
    res.status(200).json(image);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { imageAlt } = req.body;
    const { imageSrc } = req.file ? req.file.path : "";
    const update = {
      imageSrc,
      imageAlt,
    };
    if (req.file) {
      update.imageSrc = req.file.path;
    }
    const updatedOurComment = await ourComment.findByIdAndUpdate(
      req.params.id,
      update
    );
    res.status(200).json(updatedOurComment);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", upload.single("image"), async (req, res) => {
  try {
    const deleted = await ourComment.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(deleted);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
