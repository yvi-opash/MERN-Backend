import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI as string
    );

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
};