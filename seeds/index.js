
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
    for (let index = 0; index < 50; index++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        const newCamp = new Campground({
            location: `${cities[randomNumber].city}, ${cities[randomNumber].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await newCamp.save();
    }
}

seedDB().then(() => {
    console.log('Database populated');
    mongoose.connection.close();
});