const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  status: {
    type: String,
    enum: ["processing", "indexed", "failed"],
    default: "processing",
  },

  progress: {
    type: Number,
    default: 0,
  },

  queries: {
    type: Number,
    default: 0,
  },

  entities: [String],
}, { timestamps: true });

module.exports =
  mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
