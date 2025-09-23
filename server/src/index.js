import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
