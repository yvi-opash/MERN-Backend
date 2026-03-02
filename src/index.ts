import app from "./server";
import { connectDB } from "./db";

connectDB();

export default app;
