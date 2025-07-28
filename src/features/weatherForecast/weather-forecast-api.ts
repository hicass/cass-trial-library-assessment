import type { Dayjs } from 'dayjs';
import { generateFakeMarsWeather } from './utils/generateFakeMarsWeather';

// Simulates an API call to fetch Mars weather data for a given start date.
export const fetchMarsWeather = async (startDate: Dayjs) => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate fake weather data starting from today
    const data = generateFakeMarsWeather(startDate);
    return data;
  } catch {
    // TODO: Add logging here for backend monitoring (e.g., send error to logging service)
    throw new Error('Failed to fetch Mars weather data. Please try again later.');
  }
};