import mongoose, { Schema, Document } from 'mongoose';

export interface IWeather extends Document {
  date: Date;
  airTemperature: number;
  waterTemperature: number;
  recommendedSuit: string;
  createdAt: Date;
  updatedAt: Date;
}

const WeatherSchema: Schema = new Schema({
  date: {
    type: Date,
    required: true,
    index: true
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
    required: true,
    enum: ['3mm', '5mm', '7mm', 'dry']
  }
}, {
  timestamps: true
});

// 인덱스 설정
WeatherSchema.index({ date: 1 }, { unique: true });

export default mongoose.model<IWeather>('Weather', WeatherSchema); 