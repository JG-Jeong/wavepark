import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  airTemperature: { type: Number, required: true },
  waterTemperature: { type: Number, required: true },
  weather: { type: String, required: true },
  wetsuitThickness: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export const Weather = mongoose.model('Weather', weatherSchema); 