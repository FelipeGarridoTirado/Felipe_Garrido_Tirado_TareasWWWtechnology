import express from "express";
import dotenv from "dotenv";
import { db_initialize_create } from "./db.js";
import itemsRouter from "./routes/items.js";
import authRouter from './routes/auth.js';

dotenv.config();

db_initialize_create().then(() => {
  console.log("DB initialized and tables created");
});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/items", itemsRouter);

app.use("/auth", authRouter);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("PORT:", process.env.PORT);
//console.log("JWT_SECRET:", process.env.JWT_SECRET);
