const express = require("express");
const exportRoute = express.Router();
const connectDb = require("../initdb/connectDb");
const { CandidateModel } = require("../models/candidates");
const PDFDocument = require("pdfkit");
const axios = require("axios");

connectDb();
const Candidates = CandidateModel;

async function createPDF(candidates, res) {
  const doc = new PDFDocument({ margin: 30 });

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=candidates.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Candidate Report", { align: "center" }).moveDown();

  for (const candidate of candidates) {
    // // Add image if available
    // try {
    //   const response = await axios.get(candidate.image, {
    //     responseType: "arraybuffer",
    //   });
    //   const imageBuffer = Buffer.from(response.data, "binary");
    //   doc.image(imageBuffer, { fit: [150, 100], align: "center"});
    // } catch (err) {
    //   doc.text("Image load failed");
    // }

    doc
      .fontSize(14)
      .text(`Name: ${candidate.Name}`,{marginTop: 10})
      .text(`Email: ${candidate.EmailId}`)
      .text(`Status: ${candidate.Status || "N/A"}`)
      .text(`AI Rating: ${candidate.AiRating || "N/A"}`)
      .text(`Applied On: ${new Date(candidate.AppliedOn).toDateString()}`)
      .text(`Tag: ${candidate.Tag || "N/A"}`)
      .text(`CV URL: ${candidate.CvUrl || "Not Provided"}`);

    doc
      .moveDown(2)
      .moveTo(doc.x, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(1);
  }

  doc.end();
}

// Route to generate PDF and send to client
exportRoute.get("/", async (req, res) => {
  try {
    const candidates = await Candidates.find();
    await createPDF(candidates, res);
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = exportRoute;
