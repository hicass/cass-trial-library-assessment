import type { Dayjs } from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { useMarsWeather } from '../utils/useMarsWeather';
import { WeatherCard } from './WeatherCard';

// Displays a 7-day Mars weather forecast with loading, error, and data states.
export const WeatherForecast = ({ queryDate }: { queryDate: Dayjs }) => {
  const weatherQuery = useMarsWeather(queryDate);
  const weatherData = weatherQuery.data;

  const weatherCardElements = weatherData?.map((data) => (
    <WeatherCard key={data.sol} {...data} />
  ));

  return (
    <section className="w-full flex flex-col min-h-[229.5px]">
      <h3 className="title-sm">Weather Forecast</h3>

      {weatherQuery.isLoading && (
        <div
          className="flex flex-wrap justify-center lg:flex-nowrap gap-4 mt-6"
          aria-busy="true"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={144}
              height={173.5}
            />
          ))}
        </div>
      )}

      {weatherQuery.isError && (
        <div className="h-full flex-1 flex flex-col items-center justify-center">
          <p className="body-md text-center" role="alert" aria-live="assertive">
            {weatherQuery.error.message}
          </p>
          <Button onClick={() => weatherQuery.refetch()}>Try again</Button>
        </div>
      )}

      {weatherQuery.data?.length === 0 && (
        <div className="h-full flex-1 flex flex-col items-center justify-center">
          <p className="body-md text-center" role="alert" aria-live="assertive">
            No weather data available.
          </p>
        </div>
      )}

      {weatherQuery.data && (
        <div className="flex flex-wrap justify-center lg:flex-nowrap gap-4 mt-6">
          {weatherCardElements}
        </div>
      )}
    </section>
  );
};
