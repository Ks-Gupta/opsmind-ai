const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

/*
 Graph format:
 nodes: [{ id, label, group }]
 edges: [{ from, to }]
*/

router.get("/", async (req, res) => {
  try {
    const documents = await Document.find({ status: "indexed" });

    const nodes = [];
    const edges = [];
    let nodeId = 1;

    const docNodeMap = {};
    const entityNodeMap = {};

    // 📄 Document nodes
    documents.forEach(doc => {
      docNodeMap[doc.name] = nodeId;

      nodes.push({
        id: nodeId,
        label: doc.name,
        group: "document"
      });

      nodeId++;
    });

    // 🧩 Entity nodes + edges
    documents.forEach(doc => {
      if (!doc.entities) return;

      doc.entities.forEach(entity => {
        if (!entityNodeMap[entity]) {
          entityNodeMap[entity] = nodeId;

          nodes.push({
            id: nodeId,
            label: entity,
            group: "entity"
          });

          nodeId++;
        }

        edges.push({
          from: docNodeMap[doc.name],
          to: entityNodeMap[entity]
        });
      });
    });

    res.json({ nodes, edges });
  } catch (err) {
    res.status(500).json({ error: "Graph generation failed" });
  }
});

module.exports = router;
