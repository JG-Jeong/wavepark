import { WeatherType } from "../../types/types"; //장연주

import sunnyImg from "../../styles/sunny.png"; //장연주
import suncloudImg from "../../styles/suncloudy.png";
import overcloud from "../../styles/overcast_cloud.png";
import rain from "../../styles/heavy_rain.png";
import snow from "../../styles/snow_cloud.png";


export const getWeatherImage = (weather?: string):string => {
    const weatherLower = weather?.toLowerCase() ?? '';

    const imageMap: Record<WeatherType | string, string> = {
      맑음: sunnyImg,
      구름많음: suncloudImg,
      흐림: overcloud,
      비: rain,
      눈: snow
    };
    return imageMap[weatherLower] ?? sunnyImg;
  };