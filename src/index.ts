import app from "./server";
import { connectDB } from "./db";

let dbConnected = false;

export default async (req: any, res: any) => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  return app(req, res);
};
