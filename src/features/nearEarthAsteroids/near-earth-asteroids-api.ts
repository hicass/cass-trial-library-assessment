import { handleNasaApiErrors } from '../../utils/handleNasaApiErrors';

const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const NASA_API_KEY = import.meta.env.VITE_API_NASA_KEY;

export const fetchNearEarthAsteroids = async (queryDate: string) => {
  try {
    const query = `${BASE_URL}?start_date=${queryDate}&api_key=${NASA_API_KEY}`;
    const res = await fetch(query);

    handleNasaApiErrors(res);

    const data = await res.json();
    return data;
  } catch (err) {
    // TODO: Add logging here for backend monitoring (e.g., send error to logging service)
    // Example: logErrorToMonitoringService(err);

    if (err instanceof Error) {
      throw err;
    }

    throw new Error(
      'Failed to fetch Near Earth Asteroid data. Please try again later.'
    );
  }
};
