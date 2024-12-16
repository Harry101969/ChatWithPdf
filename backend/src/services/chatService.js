// import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
// import { Document } from "../models/Document.js";
// console.log(Document);
// export class ChatService {
//   constructor(pineconeIndex) {
//     this.pineconeIndex = pineconeIndex;
//     this.embeddings = new HuggingFaceInferenceEmbeddings({
//       apiKey: process.env.HUGGINGFACE_API_KEY,
//     });
//   }

//   async generateResponse(query) {
//     const queryEmbedding = await this.embeddings.embedQuery(query);

//     const queryResponse = await this.pineconeIndex.query({
//       vector: queryEmbedding,
//       topK: 5,
//       includeMetadata: true,
//     });

//     const relevantTexts = queryResponse.matches.map(
//       (match) => match.metadata.pageContent
//     );

//     // Combine relevant texts and generate a response using the context
//     const context = relevantTexts.join("\n");
//     const prompt = `Based on the following context, answer the question: "${query}"\n\nContext: ${context}`;

//     // Use HuggingFace for text generation
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/google/flan-t5-large",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inputs: prompt }),
//       }
//     );

//     const result = await response.json();
//     return result[0].generated_text;
//   }
// }

const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");
const { Document } = require("../models/Document");

class ChatService {
  constructor(pineconeIndex) {
    this.pineconeIndex = pineconeIndex;
    this.embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
    });
  }

  async generateResponse(query) {
    const queryEmbedding = await this.embeddings.embedQuery(query);

    const queryResponse = await this.pineconeIndex.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const relevantTexts = queryResponse.matches.map(
      (match) => match.metadata.pageContent
    );

    // Combine relevant texts and generate a response using the context
    const context = relevantTexts.join("\n");
    const prompt = `Based on the following context, answer the question: "${query}"\n\nContext: ${context}`;

    // Use HuggingFace for text generation
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const result = await response.json();
    return result[0].generated_text;
  }
}

module.exports = { ChatService };
