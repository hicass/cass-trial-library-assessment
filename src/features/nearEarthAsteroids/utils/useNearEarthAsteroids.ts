import { useQuery } from "@tanstack/react-query"
import { fetchNearEarthAsteroids } from "../near-earth-asteroids-api"

export const useNearEarthAsteroids = () => {
  return useQuery({
    queryKey: ['nearEarthAsteroids'],
    queryFn: () => fetchNearEarthAsteroids(),
    staleTime: 5 * 60 * 1000,
  })
}