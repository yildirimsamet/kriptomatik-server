require("dotenv").config();
const express = require("express");
const cors = require("cors");
const haberler = require("./routers/haberler");
const admin = require("./routers/admin");
const dbConnect = require("./utils/dbConnect");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/haberler", haberler);

app.use("/api/admin", admin);

app.post("/api/findbyurlNupdatevisited", async (req, res) => {
  const { url } = req.body;
  const data = await News.findOne({ url });
  if (data.visitedCount) {
    data.visitedCount = data.visitedCount + 1;
  } else {
    data.visitedCount = 1;
  }
  const success = await data.save();
  res.send(success);
});
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${PORT}`);
});
