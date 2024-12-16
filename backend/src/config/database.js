// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGODB_CONNECT);
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// }
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
