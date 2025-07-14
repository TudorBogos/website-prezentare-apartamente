// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/reviewsdb";

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ Connected to MongoDB at ${MONGO_URI}`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to save form data
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  // Path to JSON file
  const filePath = path.join(__dirname, "form_submissions.json");

  // Read existing file or start with empty array
  fs.readFile(filePath, "utf8", (err, data) => {
    let submissions = [];
    if (!err && data) {
      submissions = JSON.parse(data);
    }

    // Add new submission
    submissions.push(formData);

    // Write updated submissions back to file
    fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error saving submission.");
      }
      res.send("Submission saved successfully!");
    });
  });
});

// Define schema for reviews
const reviewSchema = new mongoose.Schema({
  name: String,
  image: String, // link to user image (ex: 'img/Blake.jpg')
  rating: Number, // ex: 5, 4.5 etc.
  apartment: String, // ex: "Apartment 1"
  comment: String, // ex: "Very nice stay, felt great."
  date: String, // ex: "December 2024"
});

// Create model based on schema
const Review = mongoose.model("Review", reviewSchema);

// Endpoint returning 3 random reviews with rating >= 3
app.get("/api/reviews", async (req, res) => {
  try {
    const topReviews = await Review.aggregate([
      { $match: { rating: { $gte: 3 } } },
      { $sample: { size: 3 } },
    ]);
    res.json(topReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Debug route to fetch all reviews
app.get("/api/debug-all-reviews", async (req, res) => {
  try {
    const all = await Review.find({});
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching all reviews" });
  }
});

// Start server and keep reference for shutdown
const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Graceful shutdown on Ctrl-C
process.on("SIGINT", async () => {
  console.log("\nSIGINT received: closing MongoDB connection...");
  try {
    await mongoose.connection.close();
    console.log("MongoDB disconnected due to app termination (SIGINT)");
  } catch (err) {
    console.error("Error during MongoDB disconnection:", err);
  }
  server.close(() => {
    console.log("Express server closed");
    process.exit(0);
  });
});
