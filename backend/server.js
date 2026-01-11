// const adminRoutes = require("./routes/admin");


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");


// dotenv.config();

// const app = express();

// app.use("/api/admin", adminRoutes);

// /* ========= MIDDLEWARE ========= */
// app.use(cors());
// app.use(express.json());                 // ✅ REQUIRED
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("➡️ HIT:", req.method, req.url);
//   next();
// });

// /* ========= MONGODB ========= */
// mongoose
//   .connect(process.env.MONGO_URI, {
//     dbName: "OpsMindAI",
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ========= ROUTES ========= */
// const uploadRouter = require("./routes/upload");
// app.use("/api/upload", uploadRouter);

// const askRouter = require("./routes/ask");
// app.use("/api/ask", askRouter);

// /* ========= HEALTH ========= */
// app.get("/", (req, res) => {
//   res.send("OpsMind AI Backend Running...");
// });

// /* ========= START ========= */
// const PORT = 5050;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use("/api/graph", require("./routes/graph"));


/* ========= MIDDLEWARE ========= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("➡️ HIT:", req.method, req.url);
  next();
});

/* ========= MONGODB ========= */
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "OpsMindAI",
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ========= ROUTES ========= */
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const uploadRouter = require("./routes/upload");
app.use("/api/upload", uploadRouter);

const askRouter = require("./routes/ask");
app.use("/api/ask", askRouter);

/* ========= HEALTH ========= */
app.get("/", (req, res) => {
  res.send("OpsMind AI Backend Running...");
});

/* ========= START ========= */
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
