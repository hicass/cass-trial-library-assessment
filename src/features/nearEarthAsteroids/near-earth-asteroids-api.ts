const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const NASA_API_KEY = import.meta.env.VITE_API_NASA_KEY;

export const fetchNearEarthAsteroids = async (
  startDate: string,
  endDate: string
) => {
  const query = `${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  const res = await fetch(query);
  const data = await res.json();

  return data;
};
