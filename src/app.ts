import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import categoriesRoutes from "./routes/categoryRoute";
import createHttpError, { isHttpError } from "http-errors";
const app = express();

app.use(express.json());
app.use("/api/categories", categoriesRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint Not Found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred!";

  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
