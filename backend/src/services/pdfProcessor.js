// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
// import { Document as LangchainDocument } from "langchain/document";
// import path from "path";

// export class PDFProcessor {
//   constructor() {
//     this.embeddings = new HuggingFaceInferenceEmbeddings({
//       apiKey: process.env.HUGGINGFACE_API_KEY,
//     });
//   }

//   async loadAndSplitPDF(filePath) {
//     const loader = new PDFLoader(filePath);
//     const docs = await loader.load();

//     const textSplitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,
//       chunkOverlap: 200,
//     });

//     return await textSplitter.splitDocuments(docs);
//   }

//   async generateEmbeddings(texts) {
//     const embeddings = [];
//     for (const text of texts) {
//       const embedding = await this.embeddings.embedQuery(text.pageContent);
//       embeddings.push({
//         id: `vec_${Date.now()}_${embeddings.length}`,
//         values: embedding,
//         metadata: text.metadata,
//       });
//     }
//     return embeddings;
//   }
// }
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");
const path = require("path");

class PDFProcessor {
  constructor() {
    this.embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
    });
  }

  async loadAndSplitPDF(filePath) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    return await textSplitter.splitDocuments(docs);
  }

  async generateEmbeddings(texts) {
    const embeddings = [];
    for (const text of texts) {
      const embedding = await this.embeddings.embedQuery(text.pageContent);
      embeddings.push({
        id: `vec_${Date.now()}_${embeddings.length}`,
        values: embedding,
        metadata: text.metadata,
      });
    }
    return embeddings;
  }
}

module.exports = { PDFProcessor };
