
const mongoose = require('mongoose');
const cities = require('./cities') 
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connecion error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 20; index++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const newCamp = new Campground({
            author: '6591dcb5a4dd3ac88adc2435',
            location: `${cities[randomNumber].city}, ${cities[randomNumber].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNumber].longitude,
                    cities[randomNumber].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dpvtarguc/image/upload/v1703959442/YelpCamp/a6vjrvvnv4t835wii4zx.jpg',
                  filename: 'YelpCamp/a6vjrvvnv4t835wii4zx'
                },
                {
                  url: 'https://res.cloudinary.com/dpvtarguc/image/upload/v1703959442/YelpCamp/nkdmhlyl5grwljvmtzya.jpg',
                  filename: 'YelpCamp/nkdmhlyl5grwljvmtzya'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatem illo nemo delectus nesciunt ad voluptatibus ex explicabo, in beatae aliquam vitae molestias, eligendi tempore sunt quibusdam? Ducimus, fugit accusamus!',
            price
        })
        await newCamp.save();
    }
}

seedDB().then(() => {
    console.log('Database populated');
    mongoose.connection.close();
});