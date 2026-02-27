import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import carRoute from "./routes/cars.routes";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());


connectDB();


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/cars", carRoute);


export default app;