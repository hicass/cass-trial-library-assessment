import type { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { fetchNearEarthAsteroids } from '../near-earth-asteroids-api';
import { formatNearEarthAsteroidsData } from './format-near-earth-asteroids-data';

// React Query hook to fetch and format near-Earth asteroids data for a given start date.
export const useNearEarthAsteroids = (startDate: Dayjs) => {
  const formattedDate = startDate ? startDate.format('YYYY-MM-DD') : null;

  return useQuery({
    enabled: !!formattedDate,
    queryKey: ['nearEarthAsteroids', formattedDate],
    queryFn: async () => {
      if (!formattedDate) throw new Error('Invalid query date');
      const rawData = await fetchNearEarthAsteroids(formattedDate);
      return formatNearEarthAsteroidsData(rawData.near_earth_objects);
    },
    staleTime: 5 * 60 * 1000,
  });
};
