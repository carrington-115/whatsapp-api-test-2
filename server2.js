import express from "express";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    statu: 200,
    message:
      "Welcome to this server. The purpose is to practice templates in the whatsapp api",
  });
});

// using simplet templates
