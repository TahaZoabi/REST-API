import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});
export default app;
