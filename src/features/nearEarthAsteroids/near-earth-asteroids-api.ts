const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const NASA_API_KEY = import.meta.env.VITE_API_NASA_KEY;

export const fetchNearEarthAsteroids = async () => {
  const res = await fetch(`${BASE_URL}?api_key=${NASA_API_KEY}`);
  const data = await res.json();

  return data;
}