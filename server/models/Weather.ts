import mongoose, { Schema, Document } from 'mongoose';

export interface IWeather extends Document {
  date: Date;
  airTemperature: number;
  waterTemperature: number;
  recommendedSuit: string;
  weatherCondition: string;
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
    enum: [ '보드숏', '스프링', '3/2', '3/2기모', '4/3' ,'4/3기모', '5mm', '세미드라이',]
    
  },
  weatherCondition: {
    type: String,
    required: true,
    enum: ['맑음', '구름', '비', '눈']
  },
}, {
  timestamps: true
});

// 인덱스 설정
WeatherSchema.index({ date: 1 }, { unique: true });

export default mongoose.model<IWeather>('Weather', WeatherSchema); 