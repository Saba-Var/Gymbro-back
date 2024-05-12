import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.get("/", (_req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
