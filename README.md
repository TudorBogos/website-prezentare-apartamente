# Holiday Apartments

Site web pentru prezentarea și promovarea apartamentelor de vacanță din Brașov.

## 🏗️ Tehnologii folosite

- **HTML5, CSS3, JavaScript**
- **Bootstrap 5** & Bootstrap Icons
- **Node.js & Express.js** (backend)
- **JSON** pentru stocarea datelor din formular

## 📁 Structura proiectului

- `Index.html` – Pagina principală cu prezentarea apartamentelor și recenzii.
- `apartments.html` – Pagina cu detalii pentru fiecare apartament (imagini, locație, descriere).
- `contact.html` – Formular de contact care trimite date către server.
- `server.js` – Server Express care salvează datele în `form_submissions.json`.
- `img/` – Imagini pentru apartamente, logo și recenzii.
- `css/` – Fișiere de stil separate pentru fiecare pagină.
- `js/script.js` – Script JS pentru animații și trimiterea formularului.

## 🧪 Funcționalități

- Animații pentru carduri și secțiuni.
- Formular de contact complet funcțional.
- Afișare detalii apartamente la clic pe "View Details".
- Responsiv pe mobil (social icons ascunse sub 670px).
- Carousel cu imagini într-un modal pentru fiecare apartament.

## 🔧 Rulare locală

1. Clonare proiect:

   ```bash
   git clone <repo-url>
   cd project-folder
   ```

2. Instalare dependințe:

   ```bash
   npm install
   ```

3. Rulare server:

   ```bash
   node server.js
   ```

4. Accesează:
   ```
   http://localhost:3000
   ```

## 📬 Contact

Formularul trimite datele în format JSON în fișierul `form_submissions.json`.
