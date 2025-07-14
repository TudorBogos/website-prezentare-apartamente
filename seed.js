/*
   Rulare o singură dată (ex: node seed.js) pentru a popula reviewsdb cu exemple.
*/

const mongoose = require("mongoose");
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/reviewsdb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    apartment: String,
    comment: String,
    date: String,
  })
);

async function seedData() {
  await Review.deleteMany({}); // șterge tot, pentru curățare

  await Review.insertMany([
    {
      name: "Blake Smith",
      image: "img/Blake.jpg",
      rating: 4.5,
      apartment: "Apartment 1",
      comment:
        "Amazing location and beautiful apartment! The view was breathtaking.",
      date: "December 2024",
    },
    {
      name: "Maria Garcia",
      image: "img/Maria.jpg",
      rating: 4,
      apartment: "Apartment 2",
      comment:
        "Cozy and comfortable apartment with all the amenities you need.",
      date: "November 2024",
    },
    {
      name: "David Brown",
      image: "img/David.jpg",
      rating: 5,
      apartment: "Apartment 3",
      comment: "Perfect stay! The apartment was spotless and modern.",
      date: "January 2025",
    },
    {
      name: "Ana Popescu",
      image: "img/Ana.jpg",
      rating: 3,
      apartment: "Apartment 1",
      comment: "A fost ok, dar zgomot cam mare în zonă.",
      date: "October 2024",
    },
    {
      name: "John Doe",
      image: "img/John.jpg",
      rating: 5,
      apartment: "Apartment 2",
      comment: "Excelent! Recomand cu toată încrederea.",
      date: "September 2024",
    },
    {
      name: "Elena Ionescu",
      image: "img/Elena.jpg",
      rating: 4.5,
      apartment: "Apartment 2",
      comment:
        "Ne-am simțit foarte bine, gazda foarte primitoare, totul a fost curat.",
      date: "February 2025",
    },
    {
      name: "Fabian Johnson",
      image: "img/Fabian.jpg",
      rating: 4,
      apartment: "Apartment 3",
      comment: "Amplasare excelentă, foarte aproape de centru. Recomand!",
      date: "March 2024",
    },
    {
      name: "Ioana Marin",
      image: "img/Ioana.jpg",
      rating: 3.5,
      apartment: "Apartment 1",
      comment: "Sejur plăcut, însă se poate îmbunătăți curățenia.",
      date: "May 2024",
    },
    {
      name: "Sophie Chang",
      image: "img/Sophie.jpg",
      rating: 5,
      apartment: "Apartment 2",
      comment: "Totul perfect! Voi reveni cu siguranță.",
      date: "August 2024",
    },
    {
      name: "Andreea Marin",
      image: "img/Andreea.jpg",
      rating: 2.5,
      apartment: "Apartment 3",
      comment: "A fost cam gălăgie seara, altfel ar fi fost ok.",
      date: "September 2024",
    },
    {
      name: "Cristina Popa",
      image: "img/Cristina.jpg",
      rating: 4.5,
      apartment: "Apartment 1",
      comment: "Excelent, design modern și o priveliște deosebită.",
      date: "January 2025",
    },
    {
      name: "Robert Lee",
      image: "img/Robert.jpg",
      rating: 5,
      apartment: "Apartment 3",
      comment: "Recomand! Totul la superlativ.",
      date: "February 2025",
    },
  ]);

  console.log("Date inserate cu succes!");
  process.exit();
}

seedData();
