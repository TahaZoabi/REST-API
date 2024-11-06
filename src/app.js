import "dotenv/config";
import express from "express";
import categoriesRoutes from "../src/routes/categoryRoute.js";
const app = express();

app.use(express.json());
app.use("/", categoriesRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

export default app;
