import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import type { WeatherModalProps } from '../types';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: '#0E0C0C',
  border: '0.5px solid #43403eac',
  borderRadius: '8px',
  p: 2,
};

// Displays a modal with detailed Mars weather information for a single sol.
export const WeatherModal = ({
  modalOpen,
  handleClose,
  sol,
  season,
  date,
  maxTempF,
  minTempF,
  highWindSpeed,
  lowWindSpeed,
  highPressurePa,
  lowPressurePa,
}: WeatherModalProps) => {
  const weatherModalData = [
    {
      title: 'Temperature',
      high: maxTempF,
      low: minTempF,
      unitOfMeasure: '°F',
      icon: ThermostatIcon,
    },
    {
      title: 'Wind Speed',
      high: highWindSpeed,
      low: lowWindSpeed,
      unitOfMeasure: 'm/s',
      icon: AirIcon,
    },
    {
      title: 'Pressure',
      high: highPressurePa,
      low: lowPressurePa,
      unitOfMeasure: 'Pa',
      icon: SpeedIcon,
    },
  ];

  const weatherDetailElements = weatherModalData.map((weather) => {
    const IconComponent = weather.icon;
    return (
      <div key={weather.title} className="w-full bg-[#141313] p-2 rounded-lg">
        <h3 className="body-md body-bold">{weather.title}</h3>

        <div className="body-sm mt-2 w-full flex justify-between">
          <span className="body-bold flex gap-2 items-center">
            <IconComponent fontSize="small" />
            High:
          </span>
          <p>
            {weather.high ?? '--'} {weather.unitOfMeasure}
          </p>
        </div>

        <div className="body-sm mt-2 w-full flex justify-between">
          <span className="body-bold flex gap-2 items-center">
            <IconComponent fontSize="small" />
            Low:
          </span>
          <p>
            {weather.low ?? '--'} {weather.unitOfMeasure}
          </p>
        </div>
      </div>
    );
  });

  return (
    <Modal
      aria-labelledby="modal-title"
      open={modalOpen}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={modalOpen}>
        <Box role="dialog" aria-modal="true" sx={modalBoxStyle}>
          <div className="w-full flex flex-col items-center gap-4">
            <p id="modal-title" className="body-md">
              Weather Information
            </p>
            <button
              onClick={handleClose}
              aria-label="Close weather details"
              className="absolute text-xl top-2 right-3 text-gray-400 hover:text-white hover:cursor-pointer"
            >
              ×
            </button>

            <hr className="h-[0.5px] bg-[#c5c5c5] border-none w-full" />

            <div className="text-center">
              <p className="title-sm">Sol {sol}</p>
              <p className="body-md mt-1">{date.format('ddd MMM D')}</p>
            </div>

            <div className="body-sm w-full flex justify-between">
              <span className="body-bold flex gap-2 items-center">
                <WbSunnyIcon fontSize="small" />
                Season:
              </span>
              <p>{season ?? '--'}</p>
            </div>

            {weatherDetailElements}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
