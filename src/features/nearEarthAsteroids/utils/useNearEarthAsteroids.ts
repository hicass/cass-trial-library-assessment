import type { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { fetchNearEarthAsteroids } from '../near-earth-asteroids-api';
import { formatNearEarthAsteroidsData } from './format-near-earth-asteroids-data';

export const useNearEarthAsteroids = (startDate: Dayjs) => {
  const formattedDate = startDate.format('YYYY-MM-DD');

  return useQuery({
    queryKey: ['nearEarthAsteroids', formattedDate],
    queryFn: async () => {
      const rawData = await fetchNearEarthAsteroids(formattedDate);
      return formatNearEarthAsteroidsData(rawData.near_earth_objects);
    },
    staleTime: 5 * 60 * 1000,
  });
};
