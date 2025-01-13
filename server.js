const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

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

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
