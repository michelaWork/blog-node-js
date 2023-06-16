const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin";

//get for admin login page
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Personal Blog created with NodeJs, Express and MongoDB",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {}
});

//post admin check login
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (req.body.username === "admin" && req.body.password === "password") {
      res.send("you ara logged in");
    } else {
      res.send("wrong username or password");
    }
  } catch (error) {}
});

module.exports = router;
