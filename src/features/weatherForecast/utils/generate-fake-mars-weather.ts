import dayjs, { Dayjs } from 'dayjs';
import type { MarsWeather } from '../types';

// Reference landing date for sol calculations (Curiosity, Sol 0)
const LANDING_DATE = dayjs('2012-08-06');

// Convert an Earth date to Mars sol since landing
function earthDateToSol(date: Dayjs): number {
  const earthDaysSinceLanding = date.diff(LANDING_DATE, 'day', true);
  // 1 sol ≈ 1.02749125 Earth days
  return Math.round(earthDaysSinceLanding / 1.02749125);
}

// Get Martian season from sol number
function getMarsSeason(sol: number): 'Spring' | 'Summer' | 'Autumn' | 'Winter' {
  const Ls = ((sol % 669) / 669) * 360;
  if (Ls < 90) return 'Spring';
  if (Ls < 180) return 'Summer';
  if (Ls < 270) return 'Autumn';
  return 'Winter';
}

// Generate 7 days of fake Mars weather data starting from a given date
export const generateFakeMarsWeather = (startDate: Dayjs): MarsWeather[] => {
  const days: MarsWeather[] = [];
  let date = startDate;

  for (let i = 0; i < 7; i++) {
    const sol = earthDateToSol(date);
    const minTempF = Math.floor(Math.random() * 50) - 150;
    const maxTempF = minTempF + Math.floor(Math.random() * 20) + 5;
    const lowPressurePa = Math.floor(Math.random() * 30) + 650;
    const highPressurePa = lowPressurePa + Math.floor(Math.random() * 50) + 10;
    const lowWindSpeed = Math.floor(Math.random() * 3) + 1;
    const highWindSpeed = lowWindSpeed + Math.floor(Math.random() * 10) + 3;
    const season = getMarsSeason(sol);

    days.push({
      sol,
      date: date,
      minTempF,
      maxTempF,
      lowPressurePa,
      highPressurePa,
      lowWindSpeed,
      highWindSpeed,
      season,
    });

    date = date.add(1, 'day');
  }

  return days;
};
