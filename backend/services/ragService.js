const Chunk = require("../models/Chunk");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const embedModel = genAI.getGenerativeModel({
  model: "text-embedding-004"
});

function splitText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize - overlap;
  }

  return chunks;
}

async function storeChunks(text, filename) {
  const chunks = splitText(text);
  console.log("👉 Total chunks:", chunks.length);

  for (const chunk of chunks) {
    const embeddingResult = await embedModel.embedContent(chunk);

    await Chunk.create({
      text: chunk,
      source: filename,
      embedding: embeddingResult.embedding.values
    });
  }

  console.log("✅ Stored chunks with embeddings");
}

module.exports = { storeChunks };
