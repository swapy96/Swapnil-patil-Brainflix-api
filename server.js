const express = require("express");
const app = express();

const port = 9999;
const cors = require("cors");
const videoRoutes = require("./routes/videos");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/videos", videoRoutes);

app.listen(port, () => {
  console.log(`Express demo listening on port ${port}`);
});
