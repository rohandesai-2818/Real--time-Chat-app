import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Correct relative path to .env
dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT;

if (!PORT || !process.env.MONGODB_URI) {
  console.error("Check the env file for correct values");
  process.exit(1); 
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}
));

app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
