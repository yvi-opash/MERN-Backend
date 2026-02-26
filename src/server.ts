import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import carRoute from "./routes/cars.routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB (serverless safe)
connectDB();

// routes
app.use("/api/cars", carRoute);

// export for vercel
export default app;