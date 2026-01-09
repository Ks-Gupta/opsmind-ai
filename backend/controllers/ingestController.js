const fs = require("fs");
const pdfParse = require("pdf-parse");
const { storeChunks } = require("../services/ragService");

exports.ingestPDF = async (req, res) => {
  try {
    console.log("STEP 1: Request Received");

    const buffer = fs.readFileSync(req.file.path);
    console.log("STEP 3: Buffer size =", buffer.length);

    const data = await pdfParse(buffer);
    console.log("STEP 4: PDF parsed");
    console.log("STEP 5: Text length =", data.text.length);

    await storeChunks(data.text, req.file.originalname);

    return res.json({
      success: true,
      message: "PDF parsed & chunks stored 🎉"
    });

  } catch (err) {
  console.warn("⚠️ PDF parse warning:", err.message);

  if (err.message.includes("bad XRef")) {
    return res.status(200).json({
      success: false,
      warning: "PDF has minor structural issues. Please re-export or try again."
    });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to process PDF"
  });
}

};

