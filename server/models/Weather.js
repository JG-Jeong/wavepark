const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    airTemperature: {
        type: Number,
        required: true
    },
    waterTemperature: {
        type: Number,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    wetsuitThickness: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Weather', weatherSchema); 