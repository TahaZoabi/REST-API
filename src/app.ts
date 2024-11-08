import "dotenv/config";
import express from "express";
import categoriesRoutes from "./routes/categoryRoute";
const app = express();

app.use(express.json());
app.use("/api/categories", categoriesRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

export default app;
