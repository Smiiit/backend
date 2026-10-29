import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.PORT || 5000);

const server = app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

function shutdown() {
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
