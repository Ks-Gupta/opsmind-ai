const express = require("express");
const router = express.Router();
const Chunk = require("../models/Chunk");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const embedModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

router.post("/", async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1️⃣ Embed question
    const embedResult = await embedModel.embedContent(question);
    const questionVector = embedResult.embedding.values;

    // 2️⃣ Vector search
    const chunks = await Chunk.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: questionVector,
          numCandidates: 100,
          limit: 5,
        },
      },
    ]);

    // 3️⃣ Build context (even if empty)
    const context = chunks.length
      ? chunks.map(c => c.text).join("\n\n")
      : "No relevant context found.";

    // 4️⃣ Ask Ollama (ALWAYS)
    const ollamaResponse = await axios.post(
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
        stream: false,
      },
      { timeout: 60000 }
    );

    return res.json({
      answer: ollamaResponse.data.response.trim(),
      citations: [...new Set(chunks.map(c => c.source))],
    });

  } catch (err) {
    console.error("❌ ASK ERROR:", err);
    return res.status(500).json({
      error: "Ask endpoint failed",
      details: err.message,
    });
  }
});

module.exports = router;
