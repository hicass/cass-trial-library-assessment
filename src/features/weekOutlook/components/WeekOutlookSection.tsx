import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { ContentContainer } from '../../../components/containers/ContentContainer';
import { NearEarthAsteroidsTable } from '../../nearEarthAsteroids/components/NearEarthAsteroidsTable';
import { WeatherForecast } from '../../weatherForecast/components/WeatherForecast';

const copyData = {
  title: 'Plan Your Perfect Launch',
  description:
    "Pick your travel date to see the 7-day Mars weather outlook and any nearby asteroids to be aware of. We'll help you choose the safest and most comfortable time to lift off.",
};

// Displays the main week outlook section, including:
// - A header with title, description, and a date picker for selecting the travel date
// - The 7-day Mars weather forecast for the selected date
// - A table of near-Earth asteroids for the next 7 days from the selected date
export const WeekOutlookSection = () => {
  const [queryDate, setQueryDate] = useState<Dayjs>(dayjs());

  return (
    <ContentContainer>
      <section id="week-outlook" className="flex flex-col gap-12 scroll-m-12">
        <header className="flex flex-col lg:flex-row gap-6">
          <div>
            <h2 className="title-md mx-auto">{copyData.title}</h2>

            <p className="body-md lg:w-4/6 mt-2">{copyData.description}</p>
          </div>

          <div className="mt-2">
            <DatePicker
              label="Select Travel Date"
              value={queryDate}
              onChange={(newValue) => {
                if (newValue) setQueryDate(newValue);
              }}
              slotProps={{
                textField: {
                  id: 'travel-date',
                  'aria-label': 'Travel date picker',
                },
              }}
              disablePast
            />
          </div>
        </header>

        <WeatherForecast queryDate={queryDate} />

        <NearEarthAsteroidsTable queryDate={queryDate} />
      </section>
    </ContentContainer>
  );
};
