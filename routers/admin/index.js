const express = require("express");
const router = express.Router();
router.post("/addpost", async (req, res) => {
  const { title, url, content, category, image, source } = req.body;
  if (!title || !url || !content || !category || !image || !source) {
    return res.json({ success: false });
  } else {
    const item = await News.find({}).sort({ id: -1 }).limit(1);
    const newPost = await News.create({
      id: item[0].id + 1,
      title,
      url,
      content,
      category,
      image,
      source,
    });
    return res.json({ success: true, data: newPost });
  }
});
router.post("/", (req, res) => {
  const { password, email } = req.body;
  if (password == process.env.ADMIN_PASS && email == process.env.ADMIN_EMAIL) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

module.exports = router;
