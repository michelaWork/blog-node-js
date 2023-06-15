const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Routes
router.get("", async (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Personal Blog created with NodeJs, Express and MongoDB",
  };

  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
