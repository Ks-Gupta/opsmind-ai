// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// // uploads folder (same one you already use)
// const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// /* =========================
//    📊 ADMIN STATS
// ========================= */
// router.get("/stats", async (req, res) => {
//   try {
//     const files = fs.readdirSync(UPLOAD_DIR);

//     res.json({
//       totalDocuments: files.length,
//       activeUsers: 342,
//       queriesToday: 2891,
//       avgResponse: "1.2s"
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to load stats" });
//   }
// });

// /* =========================
//    📄 ADMIN DOCUMENTS
// ========================= */
// router.get("/documents", async (req, res) => {
//   try {
//     const files = fs.readdirSync(UPLOAD_DIR);

//     const documents = files.map((name) => ({
//       name,
//       queries: Math.floor(Math.random() * 1000),
//       status: doc.indexed ? "indexed" : "processing"

//     }));

//     res.json(documents);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to load documents" });
//   }
// });

// /* =========================
//    🗑 DELETE DOCUMENT
// ========================= */
// router.delete("/documents/:filename", (req, res) => {
//   const filePath = path.join(UPLOAD_DIR, req.params.filename);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   fs.unlinkSync(filePath);
//   res.json({ success: true });
// });

// /* 👁 VIEW DOCUMENT */
// router.get("/documents/view/:filename", (req, res) => {
//   const { filename } = req.params;

//   const filePath = path.join(__dirname, "..", "uploads", filename);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   res.setHeader("Content-Type", "application/pdf");
//   res.sendFile(filePath);
// });

// // 📊 CHART DATA
// router.get("/charts", async (req, res) => {
//   try {
//     // Mocked for now – later can be real analytics
//     res.json({
//       queriesOverTime: [
//         { day: "Mon", queries: 120 },
//         { day: "Tue", queries: 180 },
//         { day: "Wed", queries: 260 },
//         { day: "Thu", queries: 310 },
//         { day: "Fri", queries: 420 },
//         { day: "Sat", queries: 380 },
//         { day: "Sun", queries: 290 }
//       ],
//       documentStatus: [
//         { name: "Indexed", value: 24 },
//         { name: "Processing", value: 7 }
//       ]
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Chart data error" });
//   }
// });


// module.exports = router;


const express = require("express");
const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");

const router = express.Router();

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/* =========================
   📊 ADMIN STATS
========================= */
router.get("/stats", async (req, res) => {
  try {
    const totalDocuments = await Document.countDocuments();

    res.json({
      totalDocuments,
      activeUsers: 342,
      queriesToday: 2891,
      avgResponse: "1.2s"
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load stats" });
  }
});

/* =========================
   📄 ADMIN DOCUMENTS
========================= */
router.get("/documents", async (req, res) => {
  try {
    const documents = await Document.find()
      .sort({ createdAt: -1 })
      .select("name queries status progress");

    res.json(
      documents.map((doc) => ({
        name: doc.name,
        queries: doc.queries,
        status: doc.status,
        progress: doc.progress ?? 0   // 👈 IMPORTANT
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to load documents" });
  }
});




/* =========================
   🗑 DELETE DOCUMENT
========================= */
router.delete("/documents/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    // delete DB entry
    await Document.deleteOne({ name: filename });

    // delete file
    const filePath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* =========================
   👁 VIEW DOCUMENT
========================= */
router.get("/documents/view/:filename", (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(filePath);
});

/* =========================
   📊 CHART DATA
========================= */
router.get("/charts", async (req, res) => {
  try {
    const indexed = await Document.countDocuments({ status: "indexed" });
    const processing = await Document.countDocuments({ status: "processing" });

    res.json({
      queriesOverTime: [
        { day: "Mon", queries: 120 },
        { day: "Tue", queries: 180 },
        { day: "Wed", queries: 260 },
        { day: "Thu", queries: 310 },
        { day: "Fri", queries: 420 },
        { day: "Sat", queries: 380 },
        { day: "Sun", queries: 290 }
      ],
      documentStatus: [
        { name: "Indexed", value: indexed },
        { name: "Processing", value: processing }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: "Chart data error" });
  }
});

module.exports = router;
