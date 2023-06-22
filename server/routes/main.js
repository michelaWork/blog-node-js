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
    res.render("index", { locals, data, currentRoute: "/" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about",
  });
});

//get :id for single post page
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: "Personal Blog created with NodeJs, Express and MongoDB",
    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
});

//post searchTerm
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Personal Blog created with NodeJs, Express and MongoDB",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
