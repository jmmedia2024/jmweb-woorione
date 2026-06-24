import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Serve static compiled assets in production, otherwise mount vite dev server
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const startVite = async () => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  };
  startVite();
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[FULLSTACK] Server running natively on http://0.0.0.0:${PORT}`);
});
