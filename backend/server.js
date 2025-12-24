const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "OpsMindAI"
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("OpsMind AI Backend Running...");
});

const uploadRouter = require("./routes/upload");
app.use("/api/upload", uploadRouter);

const askRouter = require("./routes/ask");
app.use("/api/ask", askRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
