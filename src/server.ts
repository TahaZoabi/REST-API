import app from "./app";
import env from "../src/lib/validateEnv";

const port = env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
