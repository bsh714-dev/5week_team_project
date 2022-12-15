const express = require("express");
const router = express.Router();

const signUpRouter = require("./signup.routes");
const postsRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
const usersRouter = require("./login.routes");

router.use("/signup", signUpRouter);
router.use("/login", usersRouter);
router.use("/comments", commentRouter);
router.use("/posts", postsRouter);
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
