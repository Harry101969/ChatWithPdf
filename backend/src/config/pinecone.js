// // import { PineconeClient } from "@pinecone-database/pinecone";
// // import dotenv from "dotenv";

// // dotenv.config();

// // export async function initPinecone() {
// //   const pinecone = new PineconeClient();
// //   await pinecone.init({
// //     environment: process.env.PINECONE_ENVIRONMENT,
// //     apiKey: process.env.PINECONE_API_KEY,
// //   });
// //   return pinecone;
// // }
// // import pkg from "@pinecone-database/pinecone"; // Import the entire CommonJS module as 'pkg'
// // import dotenv from "dotenv";

// // dotenv.config();

// // const { Pinecone } = pkg; // Destructure 'Pinecone' from the module

// // export async function initPinecone() {
// //   const pinecone = new Pinecone();
// //   await pinecone.init({
// //     environment: process.env.PINECONE_ENVIRONMENT,
// //     apiKey: process.env.PINECONE_API_KEY,
// //   });
// //   return pinecone;
// // }
// // const { Pinecone } = require("@pinecone-database/pinecone");
// // const dotenv = require("dotenv");

// // dotenv.config();

// // async function initPinecone() {
// //   const pinecone = new Pinecone();
// //   await pinecone.init({
// //     environment: process.env.PINECONE_ENVIRONMENT,
// //     apiKey: process.env.PINECONE_API_KEY,
// //   });
// //   return pinecone;
// // }

// // module.exports = { initPinecone };

// const { PineconeClient } = require("@pinecone-database/pinecone"); // Import PineconeClient
// const dotenv = require("dotenv");

// dotenv.config();

// async function initPinecone() {
//   // Create a new instance of PineconeClient
//   const pinecone =new PineconeClient();

//   // Initialize the client with environment and API key
//   await pinecone.init({
//     apiKey: process.env.PINECONE_API_KEY,
//     environment: process.env.PINECONE_ENVIRONMENT,
//   });

//   return pinecone;
// }

// module.exports = { initPinecone };
const { PineconeClient } = require("@pinecone-database/pinecone");
const dotenv = require("dotenv");

dotenv.config();

async function initPinecone() {
  // Create a new instance of PineconeClient
  const pinecone = new PineconeClient();

  // Use the connect method to initialize with your API key and environment
  await pinecone.connect({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  // Return the initialized Pinecone client
  return pinecone;
}

module.exports = { initPinecone };
