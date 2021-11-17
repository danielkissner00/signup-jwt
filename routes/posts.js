const router = require("express").Router();
const verify = require("../routes/verifyToken");

router.get("/", verify, (req, res) => {
  res.json({ posts: [{ title: "title", content: "content" }] });
  //   res.json({ posts: [{ title: "my first posts", content: "content" }] });
});

module.exports = router;
