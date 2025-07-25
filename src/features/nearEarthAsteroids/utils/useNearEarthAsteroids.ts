import type { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { fetchNearEarthAsteroids } from '../near-earth-asteroids-api';

export const useNearEarthAsteroids = (startDate: Dayjs, endDate: Dayjs) => {
  const formattedStartDate = startDate.format('YYYY-MM-DD');
  const formattedEndDate = endDate.format('YYYY-MM-DD');

  return useQuery({
    queryKey: ['nearEarthAsteroids', formattedStartDate, formattedEndDate],
    queryFn: () =>
      fetchNearEarthAsteroids(formattedStartDate, formattedEndDate),
    staleTime: 5 * 60 * 1000,
  });
};
