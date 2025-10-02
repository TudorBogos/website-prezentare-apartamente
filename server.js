// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

// Serve static files (e.g., index.html, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to save form data
app.post("/submit-form", (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, "form_submissions.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let submissions = [];
    if (!err && data) {
      submissions = JSON.parse(data);
    }

    submissions.push(formData);

    fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error saving submission.");
      }
      res.send("Submission saved successfully!");
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
