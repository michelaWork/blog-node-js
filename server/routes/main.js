const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Routes
//get home
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

//get :id for single post page
router.get("/post/:id", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Personal Blog created with NodeJs, Express and MongoDB",
    };

    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
