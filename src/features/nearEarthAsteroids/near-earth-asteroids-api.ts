const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const NASA_API_KEY = import.meta.env.VITE_API_NASA_KEY;

export const fetchNearEarthAsteroids = async (queryDate: string) => {
  try {
    const query = `${BASE_URL}?start_date=${queryDate}&api_key=${NASA_API_KEY}`;
    const res = await fetch(query);

    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch asteroid data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
