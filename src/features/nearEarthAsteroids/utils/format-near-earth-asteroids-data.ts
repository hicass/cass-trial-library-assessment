import dayjs from 'dayjs';
import type { AsteroidData } from '../types';

// Converts a boolean to "Yes" or "No"
const formatHazardLvl = (boolean: boolean): string => {
  return boolean ? 'Yes' : 'No';
};

// Extracts and returns the asteroid name inside parentheses, or the full name if not present
const formatName = (name: string): string => {
  const match = name.match(/\(([^)]+)\)/);
  return match ? match[1] : name;
};

/**
 * Formats a stringified number with thousands separators and rounds to a specified number of decimal places.
 * Example: "1234567.89123" with decimals=2 => "1,234,567.89"
 * Returns the original string if input is not a valid number.
 */
const formatNumberString = (number: string, decimals = 2) => {
  const num = Number(number);
  if (isNaN(num)) return number;
  const rounded = num.toFixed(decimals);
  const [integer, decimal] = rounded.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

/**
 * Formats raw near-Earth asteroid API data for table display.
 * @param data - Raw data from the NASA API
 * @returns Formatted array for table consumption
 */
export const formatNearEarthAsteroidsData = (asteroidsData: AsteroidData[]) => {
  const formattedAsteroidsData = [];

  for (const dateKey in asteroidsData) {
    const asteroidsForDate = asteroidsData[dateKey];

    if (Array.isArray(asteroidsForDate)) {
      for (const asteroid of asteroidsForDate as AsteroidData[]) {
        const closeApproach = asteroid.close_approach_data?.[0] || {};

        formattedAsteroidsData.push({
          id: asteroid.id,
          name: formatName(asteroid.name),
          closeApproachDate: dayjs(
            closeApproach.close_approach_date_full
          ).format('MMMM D, YYYY h:mm A'),
          potentiallyHazardous: formatHazardLvl(
            asteroid.is_potentially_hazardous_asteroid
          ),
          missDistanceKm: formatNumberString(
            closeApproach.miss_distance?.kilometers
          ),
          absoluteMagnitudeH: asteroid.absolute_magnitude_h,
          relativeVelocityKph: formatNumberString(
            closeApproach.relative_velocity?.kilometers_per_hour
          ),
          estimatedDiameterMaxKm: formatNumberString(
            asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            3
          ),
          estimatedDiameterMinKm: formatNumberString(
            asteroid.estimated_diameter.kilometers.estimated_diameter_min,
            3
          ),
        });
      }
    }
  }

  // Sort asteroids by their close approach date (ascending)
  const asteroidsSortedByDate = formattedAsteroidsData.sort(
    (a, b) =>
      dayjs(a.closeApproachDate).valueOf() -
      dayjs(b.closeApproachDate).valueOf()
  );

  return asteroidsSortedByDate;
};
