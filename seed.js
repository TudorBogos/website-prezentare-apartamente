/*
   Rulare o singură dată (ex: node seed.js) pentru a popula reviewsdb cu exemple.
*/

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/reviewsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Review = mongoose.model(
    'Review',
    new mongoose.Schema({
        name: String,
        image: String,
        rating: Number,
        apartment: String,
        comment: String,
        date: String
    })
);

async function seedData() {
    await Review.deleteMany({}); // șterge tot, pentru curățare

    await Review.insertMany([{
            name: 'Blake Smith',
            image: 'img/Blake.jpg',
            rating: 4.5,
            apartment: 'Apartment 1',
            comment: 'Amazing location and beautiful apartment! The view was breathtaking.',
            date: 'December 2024'
        },
        {
            name: 'Maria Garcia',
            image: 'img/Maria.jpg',
            rating: 4,
            apartment: 'Apartment 2',
            comment: 'Cozy and comfortable apartment with all the amenities you need.',
            date: 'November 2024'
        },
        {
            name: 'David Brown',
            image: 'img/David.jpg',
            rating: 5,
            apartment: 'Apartment 3',
            comment: 'Perfect stay! The apartment was spotless and modern.',
            date: 'January 2025'
        },
        {
            name: 'Ana Popescu',
            image: 'img/Ana.jpg',
            rating: 3,
            apartment: 'Apartment 1',
            comment: 'A fost ok, dar zgomot cam mare în zonă.',
            date: 'October 2024'
        },
        {
            name: 'John Doe',
            image: 'img/John.jpg',
            rating: 5,
            apartment: 'Apartment 2',
            comment: 'Excelent! Recomand cu toată încrederea.',
            date: 'September 2024'
        }
    ]);

    console.log('Date inserate cu succes!');
    process.exit();
}

seedData();