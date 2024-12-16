// import express from 'express';
// import { upload } from '../middleware/upload.js';

// export function createRouter(uploadController, chatController) {
//   const router = express.Router();

//   router.post('/upload', upload.single('pdf'), (req, res) => {
//     uploadController.handleUpload(req, res);
//   });

//   router.post('/chat', (req, res) => {
//     chatController.handleMessage(req, res);
//   });

//   return router;
// }

const express = require("express");
const { upload } = require("../middleware/upload");

function createRouter(uploadController, chatController) {
  const router = express.Router();

  router.post("/upload", upload.single("pdf"), (req, res) => {
    uploadController.handleUpload(req, res);
  });

  router.post("/chat", (req, res) => {
    chatController.handleMessage(req, res);
  });

  return router;
}

module.exports = { createRouter };
