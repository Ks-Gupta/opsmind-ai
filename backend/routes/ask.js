const express = require("express");
const router = express.Router();
const Chunk = require("../models/Chunk");
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1️⃣ Get top chunks (simple retrieval for now)
    const chunks = await Chunk.find().limit(3);

    if (!chunks || chunks.length === 0) {
      return res.json({
        answer: "I don’t know. This information is not present in the SOPs.",
        citations: []
      });
    }

    // 2️⃣ Build context
    const context = chunks.map(c => c.text).join("\n\n");

    // 3️⃣ Ask LOCAL LLM (Ollama)
    ollamaResponse = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "mistral",
      prompt: `
You are OpsMind AI.
Answer ONLY using the context below.
If the answer is not in the context, say "I don't know".

Context:
${context}

Question:
${question}
`,
        stream: false
      }
    );

    res.json({
      answer: ollamaResponse.data.response.trim(),
      citations: chunks.map(c => c.source)
    });

  } catch (err) {
  console.error("❌ ASK ERROR FULL:", err);
  console.error("❌ ASK ERROR MESSAGE:", err.message);
  console.error("❌ ASK ERROR RESPONSE:", err.response?.data);

  return res.status(500).json({
    error: "Ask endpoint failed",
    details: err.message
  });
}
});

module.exports = router;
