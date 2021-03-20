const express = require("express");
const router = express.Router();
const News = require("../../models/News");
const dbConnect = require("../../utils/dbConnect");

router.get("/count", async (req, res) => {
  const count = await News.find({}).countDocuments();
  return res.json({ count });
});
router.get("/findbyurl/:url", async (req, res) => {
  const data = await News.find({ url: req.params.url });

  if (data) {
    return res.json(data);
  } else {
    return res.json({ data: { title: "Error" } });
  }
});
router.get("/firstfiveposts", async (req, res) => {
  const data = await News.find({}).sort({ id: -1 }).limit(5);
  return res.json(data);
});
router.get("/pagination/:id", async (req, res) => {
  const data = await News.find({})
    .sort({ id: -1 })
    .skip(parseInt(req.params.id))
    .limit(10);
  return res.json(data);
});
router.get("/urls", async (req, res) => {
  const data = await News.find({}, { url: 1 });
  return res.json(data);
});

module.exports = router;
