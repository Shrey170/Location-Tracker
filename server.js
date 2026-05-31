const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
const locationRoutes = require("./routes/location");
app.use("/api/location", locationRoutes);

// ✅ Serve Static Frontend Files from React Build
const frontendDistPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDistPath));

// ✅ Handle frontend routes (Catch-all for React Router)
app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// ✅ 404 fallback for other requests
app.use((req, res) => {
  res.status(404).json({ message: "❌ Page not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({ message: "Database connection failed or timed out. Please check your MongoDB IP Whitelist." });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
