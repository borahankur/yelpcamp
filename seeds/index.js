const mongoose = require('mongoose');
const cities = require("./cities");
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbURL = process.env.DB_URL;
// || 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '666994533f34b8cbc8f602fa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvnlkm0uf/image/upload/v1718276555/YelpCamp/r8d8ow6kjzo9ydkt6yvi.jpg',
                    filename: 'YelpCamp/r8d8ow6kjzo9ydkt6yvi',
                },
                {
                    url: 'https://res.cloudinary.com/dvnlkm0uf/image/upload/v1718276555/YelpCamp/fhbhecdwwo17p1xhk54i.jpg',
                    filename: 'YelpCamp/fhbhecdwwo17p1xhk54i',
                },
                {
                    url: 'https://res.cloudinary.com/dvnlkm0uf/image/upload/v1718276555/YelpCamp/pupmimswgj4lcwwwl8e5.jpg',
                    filename: 'YelpCamp/pupmimswgj4lcwwwl8e5',
                },
                {
                    url: 'https://res.cloudinary.com/dvnlkm0uf/image/upload/v1718276555/YelpCamp/vo1bdbexuvwfqhe0lw9b.jpg',
                    filename: 'YelpCamp/vo1bdbexuvwfqhe0lw9b',
                }
            ],
            description: 'Just a regular campsite that is fairly alright',
            price,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});
