import type { Dayjs } from "dayjs";

export type MarsWeather = {
  // Martian day
  sol: number;
  // Earth date
  date: Dayjs;
  // Minimum Temperature in °F
  minTempF: number;
  // Max Temperature in °F
  maxTempF: number;
  // Lowest Pressure in Pa
  lowPressurePa: number;
  // Highest Pressure in Pa
  highPressurePa: number;
  // Lowest Wind Speed in m/s
  lowWindSpeed: number;
  // Highest Wind Speed in m/s
  highWindSpeed: number;
  // Current season on Mars
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
};

export interface WeatherModalProps extends MarsWeather {
  modalOpen: boolean;
  handleClose: () => void;
}
