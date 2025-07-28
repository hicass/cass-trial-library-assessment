import { useQuery } from '@tanstack/react-query';
import { fetchMarsWeather } from '../weather-forecast-api';
import type { Dayjs } from 'dayjs';

// React Query hook to fetch and cache Mars weather data for a given start date.
export const useMarsWeather = (startDate: Dayjs) => {
  return useQuery({
    queryKey: ['marsWeather', startDate],
    queryFn: () => fetchMarsWeather(startDate),
    staleTime: 1000 * 60 * 5,
  });
};
