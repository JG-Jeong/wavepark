import mongoose from 'mongoose';

const dailyDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
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
  suitRecommendations: [{
    suitType: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true,
      enum: ['불허', '조건부허용', '출격']
    }
  }],
  bestSuit: {
    type: String,
    required: false
  }
});

export const DailyData = mongoose.model('DailyData', dailyDataSchema); 