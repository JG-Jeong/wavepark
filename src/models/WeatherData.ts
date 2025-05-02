import mongoose from 'mongoose';

const weatherDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  airTemperature: {
    type: Number,
    required: true
  },
  waterTemperature: {
    type: Number,
    required: true
  },
  recommendedSuit: {
    type: String,
    required: true
  },
  weatherCondition: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const WeatherData = mongoose.model('WeatherData', weatherDataSchema); 