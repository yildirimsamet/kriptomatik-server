const express = require("express");
const cors = require("cors");
const News = require("./models/News");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("db baglandı");
  }
);

app.get("/api/haberler/count", async (req, res) => {
  const count = await News.find({}).countDocuments();

  res.json({ count });
});
app.get("/api/haberler/findbyurl/:url", async (req, res) => {
  const data = await News.find({ url: req.params.url });

  res.json(data);
});
app.get("/api/haberler/firstfiveposts", async (req, res) => {
  const data = await News.find({}).limit(5);
  res.json(data);
});
app.get("/api/haberler/pagination/:id", async (req, res) => {
  const data = await News.find({})
    .sort({ id: -1 })
    .skip(parseInt(req.params.id))
    .limit(10);
  res.json(data);
});
app.get("/api/haberler/urls", async (req, res) => {
  const data = await News.find({}, { url: 1 });

  res.json(data);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${PORT}`);
});
