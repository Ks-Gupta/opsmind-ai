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
    type: [Number]   // 👈 vector
  }
});

module.exports = mongoose.model("Chunk", ChunkSchema);
