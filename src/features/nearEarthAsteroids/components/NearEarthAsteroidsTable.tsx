import { useMemo, useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { formatNearEarthAsteroidsData } from '../utils/format-near-earth-asteroids-data';
import { useNearEarthAsteroids } from '../utils/useNearEarthAsteroids';
import { columnStructure, paginationModel } from '../utils/asteroidDataGrid';
import WeekPicker from './WeekPicker';

// Component to render the Near Earth Asteroid Table
export const NearEarthAsteroidsTable = () => {
  const [queryWeek, setQueryWeek] = useState<Dayjs>(
    dayjs().add(1, 'week').startOf('week')
  );

  const asteroidsQuery = useNearEarthAsteroids(
    queryWeek.startOf('week'),
    queryWeek.endOf('week')
  );

  const asteroidsData = useMemo(() => {
    if (!asteroidsQuery.data) return [];

    return formatNearEarthAsteroidsData(asteroidsQuery.data.near_earth_objects);
  }, [asteroidsQuery.data]);

  if (asteroidsQuery.isLoading) return <p>Loading...</p>;
  if (asteroidsQuery.isError) return <p>Error loading asteroid information</p>;

  return (
    <section className="mt-10 w-full">
      <WeekPicker queryWeek={queryWeek} setQueryWeek={setQueryWeek} />

      <DataGrid
        rows={asteroidsData}
        columns={columnStructure}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 40]}
        sx={{ border: 0 }}
      />
    </section>
  );
};
