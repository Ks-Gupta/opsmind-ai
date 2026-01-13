


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Document = require("../models/Document");
// const path = require("path");

// async function markIndexed(filename) {
//   await Document.updateOne(
//     { name: filename },
//     {
//       status: "indexed",
//       entities: ["HR Policy", "Leave", "Reimbursement"] // abhi dummy
//     }
//   );

//   console.log("✅ Document indexed:", filename);
// }


// /* =========================
//    FILE STORAGE
// ========================= */
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// /* =========================
//    UPLOAD ROUTE
// ========================= */
// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filename = req.file.originalname;

//   try {
//     // 1️⃣ Prevent duplicate upload
//     const exists = await Document.findOne({ name: filename });
//     if (exists) {
//       return res.status(409).json({
//         error: "Document already exists"
//       });
//     }

//     // 2️⃣ Create document (processing)
//     const doc = await Document.create({
//       name: filename,
//       status: "processing",
//       queries: 0
//     });

//     // 3️⃣ Start async indexing (NON-BLOCKING)
//     setTimeout(async () => {
//       await Document.updateOne(
//         { _id: doc._id },
//         { status: "indexed" }
//       );
//       console.log(`✅ Document indexed: ${filename}`);
//     }, 3000); // simulate indexing

//     res.json({
//       ok: true,
//       filename
//     });

//   } catch (err) {
//     console.error("❌ Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Document = require("../models/Document");

// /* =========================
//    FILE STORAGE (MULTER)
// ========================= */
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // keep original name
//   }
// });

// const upload = multer({ storage });

// /* =========================
//    HELPER: MARK DOCUMENT INDEXED
// ========================= */
// async function markIndexed(docId, filename) {
//   await Document.updateOne(
//     { _id: docId },
//     {
//       status: "indexed",
//       entities: ["HR Policy", "Leave", "Reimbursement"] // dummy for now
//     }
//   );

//   console.log(`✅ Document indexed: ${filename}`);
// }

// /* =========================
//    UPLOAD ROUTE
// ========================= */
// router.post("/", upload.single("file"), async (req, res) => {
//   console.log("🔥 UPLOAD HIT");

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filename = req.file.originalname;

//   try {
//     /* 1️⃣ CHECK DUPLICATE */
//     const exists = await Document.findOne({ name: filename });
//     if (exists) {
//       return res.status(409).json({
//         error: "Document already exists"
//       });
//     }

//     /* 2️⃣ CREATE DOCUMENT (PROCESSING) */
//     const doc = await Document.create({
//       name: filename,
//       status: "processing",
//       queries: 0
//     });

//     /* 3️⃣ ASYNC INDEXING (NON-BLOCKING) */
//     setTimeout(async () => {
//       try {
//         await markIndexed(doc._id, filename);
//       } catch (err) {
//         console.error("❌ Indexing failed:", err);
//         await Document.updateOne(
//           { _id: doc._id },
//           { status: "failed" }
//         );
//       }
//     }, 3000); // simulate indexing delay

//     /* 4️⃣ RESPOND IMMEDIATELY */
//     res.json({
//       ok: true,
//       filename
//     });

//   } catch (err) {
//     console.error("❌ Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Document = require("../models/Document");

/* =========================
   FILE STORAGE
========================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

/* =========================
   INDEXING WORKER
========================= */
async function simulateIndexing(docId, filename) {
  try {
    console.log("⏳ Indexing started:", filename);

    await Document.updateOne({ _id: docId }, { progress: 30 });
    await new Promise(r => setTimeout(r, 1000));

    await Document.updateOne({ _id: docId }, { progress: 60 });
    await new Promise(r => setTimeout(r, 1000));

    await Document.updateOne(
      { _id: docId },
      {
        status: "indexed",
        progress: 100,
        entities: ["HR Policy", "Leave", "Reimbursement"],
      }
    );

    console.log("✅ Indexed:", filename);
  } catch (err) {
    console.error("❌ Indexing failed:", err);
    await Document.updateOne(
      { _id: docId },
      { status: "failed" }
    );
  }
}

/* =========================
   UPLOAD ROUTE
========================= */
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filename = req.file.originalname;

  try {
    // 1️⃣ Prevent duplicate
    const exists = await Document.findOne({ name: filename });
    if (exists) {
      return res.status(409).json({ error: "Document already exists" });
    }

    // 2️⃣ Save document
    const doc = await Document.create({
      name: filename,
      status: "processing",
      progress: 0,
      queries: 0,
    });

    // 3️⃣ START INDEXING (🔥 THIS WAS MISSING)
    simulateIndexing(doc._id, filename);

    // 4️⃣ Respond immediately
    res.status(200).json({
  success: true,
  filename
});


  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
