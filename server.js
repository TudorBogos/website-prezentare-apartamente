const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;
app.use(cors());

// Conectare la MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/reviewsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname)));

// Middleware pentru a parsa datele din cererile POST
app.use(bodyParser.json());

// Endpoint pentru salvarea datelor din formular
app.post("/submit-form", (req, res) => {
  const formData = req.body;

  // Calea către fișierul JSON
  const filePath = path.join(__dirname, "form_submissions.json");

  // Citește fișierul existent sau creează unul nou dacă nu există
  fs.readFile(filePath, "utf8", (err, data) => {
    let submissions = [];
    if (!err && data) {
      submissions = JSON.parse(data); // Parsează conținutul existent
    }

    // Adaugă noua submisiune
    submissions.push(formData);

    // Scrie submisiunile actualizate în fișier
    fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error("Eroare scriere fisier:", err);
        return res.status(500).send("Eroare la salvarea submisiunii.");
      }
      res.send("Submisiunea a fost salvată cu succes!");
    });
  });
});

// Definim o schema pentru  review-uri
const reviewSchema = new mongoose.Schema({
  name: String,
  image: String, // link către poza utilizatorului (ex: 'img/Blake.jpg')
  rating: Number, // ex: 5, 4.5 etc.
  apartment: String, // ex: "Apartment 1"
  comment: String, // ex: "Foarte frumos, m-am simtit bine."
  date: String, // ex: "December 2024"
});

// Cream modelul pe baza schema
const Review = mongoose.model("Review", reviewSchema);

// Endpoint care returnează 3 review-uri random dintre cele care au rating >= 4
app.get("/api/reviews", async (req, res) => {
  try {
    const topReviews = await Review.aggregate([
      { $match: { rating: { $gte: 3 } } }, // Filtrează review-urile cu rating >= 3
      { $sample: { size: 3 } }, // Alege aleator 3 dintre ele
    ]);
    res.json(topReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea review-urilor" });
  }
});

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
