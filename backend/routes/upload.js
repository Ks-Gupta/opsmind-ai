// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // 👈 keep original name
//   }
// });

// const upload = multer({ storage });
// router.post("/", upload.single("file"), (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file" });
//   }

//   res.status(200).json({
//     ok: true,
//     filename: req.file.originalname,
//     size: req.file.size
//   });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Document = require("../models/Document");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, file.originalname)
// });

// const upload = multer({ storage });

// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     // ✅ Check if document already exists
//     const existing = await Document.findOne({
//       name: req.file.originalname
//     });

//     if (existing) {
//       return res.status(409).json({
//         error: "Document already exists"
//       });
//     }

//     // ✅ Create DB entry
//     await Document.create({
//       name: req.file.originalname,
//       status: "processing",
//       queries: 0
//     });

//     res.json({
//       ok: true,
//       filename: req.file.originalname
//     });

//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Document = require("../models/Document");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, file.originalname),
// });

// const upload = multer({ storage });

// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     // ✅ Check if document already exists
//     const existing = await Document.findOne({
//       name: req.file.originalname,
//     });

//     if (existing) {
//       return res.status(409).json({
//         error: "Document already exists",
//       });
//     }

//     // ✅ Create DB entry
//     await Document.create({
//       name: req.file.originalname,
//       status: "processing",
//       queries: 0,
//     });

//     res.json({
//       ok: true,
//       filename: req.file.originalname,
//     });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Document = require("../models/Document");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, file.originalname)
// });

// const upload = multer({ storage });

// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     // ❌ Prevent duplicate uploads
//     const existing = await Document.findOne({
//       name: req.file.originalname
//     });

//     if (existing) {
//       return res.status(409).json({
//         error: "Document already exists"
//       });
//     }

//     // ✅ Save as PROCESSING
//     const doc = await Document.create({
//       name: req.file.originalname,
//       status: "processing",
//       queries: 0
//     });

//     // 🔄 AUTO INDEX SIMULATION
//     setTimeout(async () => {
//       await Document.updateOne(
//         { _id: doc._id },
//         { status: "indexed" }
//       );
//       console.log(`✅ Indexed: ${doc.name}`);
//     }, 4000); // ⏱ 4 seconds

//     res.json({
//       ok: true,
//       message: "Uploaded & indexing started"
//     });

//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Document = require("../models/Document");
// const fs = require("fs");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, file.originalname)
// });

// const upload = multer({ storage });

// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     const existing = await Document.findOne({
//       name: req.file.originalname
//     });

//     // ✅ If already exists → DO NOT ERROR
//     if (existing) {
//       return res.status(200).json({
//         ok: true,
//         message: "Document already exists",
//         reused: true
//       });
//     }

//     // ✅ Create new document
//     await Document.create({
//       name: req.file.originalname,
//       status: "processing",
//       queries: 0
//     });
//     // ⏳ Simulate indexing (later replace with real RAG pipeline)
//       setTimeout(async () => {
//         await Document.updateOne(
//           { name: req.file.originalname },
//           { $set: { status: "indexed" } }
//         );
//         console.log("✅ Document indexed:", req.file.originalname);
//       }, 5000); // 5 seconds


//     res.status(201).json({
//       ok: true,
//       filename: req.file.originalname
//     });

//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const Document = require("../models/Document");
const path = require("path");

/* =========================
   FILE STORAGE
========================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   UPLOAD ROUTE
========================= */
router.post("/", upload.single("file"), async (req, res) => {
  console.log("🔥 UPLOAD HIT");

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filename = req.file.originalname;

  try {
    // 1️⃣ Prevent duplicate upload
    const exists = await Document.findOne({ name: filename });
    if (exists) {
      return res.status(409).json({
        error: "Document already exists"
      });
    }

    // 2️⃣ Create document (processing)
    const doc = await Document.create({
      name: filename,
      status: "processing",
      queries: 0
    });

    // 3️⃣ Start async indexing (NON-BLOCKING)
    setTimeout(async () => {
      await Document.updateOne(
        { _id: doc._id },
        { status: "indexed" }
      );
      console.log(`✅ Document indexed: ${filename}`);
    }, 3000); // simulate indexing

    res.json({
      ok: true,
      filename
    });

  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
