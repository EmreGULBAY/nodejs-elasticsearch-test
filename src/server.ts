import dotenv from "dotenv";
import { createServer } from "./app";

const main = async () => {
  dotenv.config();

  const app = createServer();

  app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
  });
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
