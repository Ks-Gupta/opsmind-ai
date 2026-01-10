const mongoose = require("mongoose");

const ChunkSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  embedding: {
    type: [Number],
    default: []
  }
});

// ✅ PREVENT OverwriteModelError
module.exports =
  mongoose.models.Chunk || mongoose.model("Chunk", ChunkSchema);
