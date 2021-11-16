const router = require("express").Router();
const verify = require("../routes/verifyToken");

router.get("/", verify, (req, res) => {
  res.send(req.user);
  //   res.json({ posts: [{ title: "my first posts", content: "content" }] });
});

module.exports = router;
