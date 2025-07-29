import { memo, useState } from 'react';
import { WeatherModal } from './WeatherModal';
import type { MarsWeather } from '../types';

// Displays a summary card for a single sol's Mars weather, with a modal for detailed info.
export const WeatherCard = memo(
  ({
    sol,
    date,
    minTempF,
    maxTempF,
    lowPressurePa,
    highPressurePa,
    lowWindSpeed,
    highWindSpeed,
    season,
  }: MarsWeather) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
      <div className="min-w-[9rem] xl:w-full">
        <article className="glass-bg w-full flex flex-col items-center p-4 gap-2">
          <div className="text-center">
            <p className="body-lg body-bold">Sol {sol}</p>
            <p className="body-sm">{date.format('ddd MMM D')}</p>
          </div>

          <hr className="h-[0.5px] bg-[#c5c5c5] border-none w-full" />

          <div className="text-center body-sm">
            <p>
              <span className="body-bold">High:</span> {maxTempF ?? '--'} °F
            </p>
            <p>
              <span className="body-bold">Low:</span> {minTempF ?? '--'} °F
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="body-sm mt-2 hover:cursor-pointer hover:underline"
            aria-label={`More weather details for Sol ${sol}`}
          >
            Learn more
          </button>
        </article>

        <WeatherModal
          modalOpen={modalOpen}
          handleClose={handleClose}
          sol={sol}
          season={season}
          date={date}
          maxTempF={maxTempF}
          minTempF={minTempF}
          highPressurePa={highPressurePa}
          lowPressurePa={lowPressurePa}
          highWindSpeed={highWindSpeed}
          lowWindSpeed={lowWindSpeed}
        />
      </div>
    );
  }
);
