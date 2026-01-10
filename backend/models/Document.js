const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["processing", "indexed"],
    default: "processing"
  },
  queries: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports =
  mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
