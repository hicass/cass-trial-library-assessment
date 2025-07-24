// Represents a single asteroid's data from the NASA NeoWs API.
export type AsteroidData = {
  // Unique asteroid identifier
  id: string;
  // Asteroid name (may include designation in parentheses)
  name: string;
  // Array of close approach details
  close_approach_data: CloseApproachData;
  // True if asteroid is potentially hazardous
  is_potentially_hazardous_asteroid: boolean;
  // Absolute magnitude (brightness)
  absolute_magnitude_h: string;
  // Estimated diameter details
  estimated_diameter: EstimatedDiameter;
};

// Details about a single close approach event for an asteroid.
export type CloseApproachData = {
  // Full date and time of close approach
  close_approach_date_full: string;
  // Miss distance details
  miss_distance: MissDistance;
  // Relative velocity details
  relative_velocity: RelativeVelocity;
}[];

// Miss distance information for a close approach.
type MissDistance = {
  // Miss distance in kilometers
  kilometers: string;
};

// Relative velocity information for a close approach.
type RelativeVelocity = {
  // Velocity in kilometers per hour
  kilometers_per_hour: string;
};

// Estimated diameter information for an asteroid.
type EstimatedDiameter = {
  // Diameter range in kilometers
  kilometers: EstimatedDiameterKilometers;
};

// Minimum and maximum estimated diameter in kilometers.
type EstimatedDiameterKilometers = {
  // Minimum estimated diameter (km)
  estimated_diameter_min: string;
  // Maximum estimated diameter (km)
  estimated_diameter_max: string;
};
