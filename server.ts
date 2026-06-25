import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin (Server-side)
const firebaseConfig = JSON.parse(
  process.env.FIREBASE_CONFIG || "{}"
);

console.log("[SERVER] Firebase Config keys:", Object.keys(firebaseConfig));
console.log("[SERVER] Target Project ID:", firebaseConfig.projectId || "gen-lang-client-0904561341");

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp({
    projectId: firebaseConfig.projectId || "gen-lang-client-0904561341"
  });
} else {
  firebaseApp = getApps()[0];
}

// Support for custom database IDs
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId || undefined);
const app = express();
const PORT = 3000;

app.use(express.json());

// API: Branding Data
app.get("/api/branding", async (req, res) => {
  try {
    console.log("[SERVER] Fetching branding from Firestore...");
    const doc = await db.collection("branding").doc("config").get();
    if (doc.exists) {
      console.log("[SERVER] Branding found");
      res.json(doc.data());
    } else {
      console.log("[SERVER] Branding NOT found, using defaults");
      res.json({
        orgName: "비영리민간단체 우리원",
        slogan: "N·S WOORI_ONE UNION",
        logoUrl: "input_file_0.png"
      });
    }
  } catch (err: any) {
    // Even on error, return defaults to keep UI working
    res.json({
      orgName: "비영리민간단체 우리원",
      slogan: "N·S WOORI_ONE UNION",
      logoUrl: "input_file_0.png",
      error: err.message
    });
  }
});

app.post("/api/branding", async (req, res) => {
  try {
    const data = req.body;
    await db.collection("branding").doc("config").set({
      ...data,
      updatedAt: new Date(),
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save branding" });
  }
});

// API: D1 Database Info (jmweb_woori)
app.get("/api/db-status", (req, res) => {
  res.json({
    status: "active",
    provider: "Cloudflare D1 & Hyperdrive",
    database: "jmweb_woori",
    region: "APAC",
    lastSynced: new Date(),
    hyperdriveEnabled: true
  });
});

// API: Cloudflare Hyperdrive Configs Proxy
app.get("/api/cloudflare/hyperdrive", async (req, res) => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return res.status(401).json({ 
      error: "Cloudflare credentials not configured in environment",
      configured: false 
    });
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/hyperdrive/configs`,
      {
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Cloudflare API responded with ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Hyperdrive API Error:", err);
    res.status(500).json({ error: "Failed to fetch Hyperdrive configurations" });
  }
});

// API: Members List
app.get("/api/members", async (req, res) => {
  try {
    const snapshot = await db.collection("members").orderBy("joinDate", "desc").get();
    const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(members);
  } catch (err) {
    res.json([]);
  }
});

app.post("/api/members", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("members").add({
      ...data,
      joinDate: new Date(),
    });
    res.json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add member" });
  }
});

// API: Donations List
app.get("/api/donations", async (req, res) => {
  try {
    const snapshot = await db.collection("donations").orderBy("date", "desc").get();
    const donations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(donations);
  } catch (err) {
    res.json([]);
  }
});

app.post("/api/donations", async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection("donations").add({
      ...data,
      date: new Date(),
    });
    res.json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add donation" });
  }
});

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
