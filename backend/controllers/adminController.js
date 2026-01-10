import fs from "fs";
import path from "path";
import Chunk from "../models/Chunk.js";

const uploadsDir = path.join(process.cwd(), "uploads");

/**
 * 📊 Dashboard stats
 */
export const getAdminStats = async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);

    const totalDocuments = files.length;

    const totalChunks = await Chunk.countDocuments();

    res.json({
      totalDocuments,
      activeUsers: 1,            // later from users collection
      queriesToday: totalChunks, // proxy metric
      avgResponse: "1.2s"
    });
  } catch (err) {
    res.status(500).json({ message: "Admin stats error" });
  }
};

/**
 * 📂 Document Library
 */
export const getDocuments = async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);

    const docs = await Promise.all(
      files.map(async (file) => {
        const chunks = await Chunk.countDocuments({
          source: file
        });

        return {
          name: file,
          queries: chunks,
          status: chunks > 0 ? "indexed" : "processing"
        };
      })
    );

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Document fetch error" });
  }
};

/**
 * 🗑 Delete document
 */
export const deleteDocument = async (req, res) => {
  const { filename } = req.params;

  try {
    fs.unlinkSync(path.join(uploadsDir, filename));
    await Chunk.deleteMany({ source: filename });

    res.json({ success: true });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};
