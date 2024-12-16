// import { PDFProcessor } from '../services/pdfProcessor.js';
// import { Document } from '../models/Document.js';
// import cloudinary from '../config/cloudinary.js';
// import fs from 'fs/promises';

// export class UploadController {
//   constructor(pineconeIndex, io) {
//     this.pineconeIndex = pineconeIndex;
//     this.pdfProcessor = new PDFProcessor();
//     this.io = io;
//   }

//   async handleUpload(req, res) {
//     try {
//       const file = req.file;
//       this.io.emit('processingUpdate', 'Uploading PDF to cloud storage...');

//       // Upload to Cloudinary
//       const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
//         resource_type: 'raw',
//         public_id: `pdfs/${Date.now()}-${file.originalname}`,
//       });

//       this.io.emit('processingUpdate', 'Processing PDF content...');

//       // Process PDF
//       const documents = await this.pdfProcessor.loadAndSplitPDF(file.path);

//       this.io.emit('processingUpdate', 'Generating embeddings...');
//       const embeddings = await this.pdfProcessor.generateEmbeddings(documents);

//       // Store in Pinecone
//       this.io.emit('processingUpdate', 'Storing vectors in database...');
//       await this.pineconeIndex.upsert(embeddings);

//       // Save document reference
//       const doc = await Document.create({
//         fileName: file.originalname,
//         cloudinaryUrl: cloudinaryResponse.secure_url,
//         vectorIds: embeddings.map(emb => emb.id),
//       });

//       // Cleanup
//       await fs.unlink(file.path);

//       this.io.emit('processingUpdate', 'PDF processed successfully!');
//       res.json({ success: true, documentId: doc._id });
//     } catch (error) {
//       console.error('Upload error:', error);
//       this.io.emit('error', 'Failed to process PDF');
//       res.status(500).json({ error: 'Failed to process PDF' });
//     }
//   }
// }
const { PDFProcessor } = require("../services/pdfProcessor");
const { Document } = require("../models/Document");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");

class UploadController {
  constructor(pineconeIndex, io) {
    this.pineconeIndex = pineconeIndex;
    this.pdfProcessor = new PDFProcessor();
    this.io = io;
  }

  async handleUpload(req, res) {
    try {
      const file = req.file;
      this.io.emit("processingUpdate", "Uploading PDF to cloud storage...");

      // Upload to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
        resource_type: "raw",
        public_id: `pdfs/${Date.now()}-${file.originalname}`,
      });

      this.io.emit("processingUpdate", "Processing PDF content...");

      // Process PDF
      const documents = await this.pdfProcessor.loadAndSplitPDF(file.path);

      this.io.emit("processingUpdate", "Generating embeddings...");
      const embeddings = await this.pdfProcessor.generateEmbeddings(documents);

      // Store in Pinecone
      this.io.emit("processingUpdate", "Storing vectors in database...");
      await this.pineconeIndex.upsert(embeddings);

      // Save document reference
      const doc = await Document.create({
        fileName: file.originalname,
        cloudinaryUrl: cloudinaryResponse.secure_url,
        vectorIds: embeddings.map((emb) => emb.id),
      });

      // Cleanup
      await fs.unlink(file.path);

      this.io.emit("processingUpdate", "PDF processed successfully!");
      res.json({ success: true, documentId: doc._id });
    } catch (error) {
      console.error("Upload error:", error);
      this.io.emit("error", "Failed to process PDF");
      res.status(500).json({ error: "Failed to process PDF" });
    }
  }
}

module.exports = { UploadController };
