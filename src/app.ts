import "dotenv/config";
import express from "express";
import categoriesRoutes from "./routes/categoryRoute";
const app = express();

app.use(express.json());
app.use("/api/categories", categoriesRoutes);
app.get("/", (_, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.use((_, res) => {
  res.status(404).json({ error: "Page Not Found!" });
});

export default app;
