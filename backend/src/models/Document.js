// import mongoose from 'mongoose';

// const documentSchema = new mongoose.Schema({
//   fileName: String,
//   cloudinaryUrl: String,
//   vectorIds: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// export const Document = mongoose.model('Document', documentSchema);

const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  fileName: String,
  cloudinaryUrl: String,
  vectorIds: [String],
  createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

module.exports = { Document };
