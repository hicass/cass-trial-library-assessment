import { type Dayjs } from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useNearEarthAsteroids } from '../utils/useNearEarthAsteroids';
import { columnStructure, paginationModel } from '../utils/asteroidDataGrid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

export interface WeekOutlookChildProps {
  queryDate: Dayjs;
}

const skeletonStyle = {
  border: '0.5px solid #43403eac',
  borderRadius: '8px',
  p: 2,
};

// Component to render the Near Earth Asteroid Table
export const NearEarthAsteroidsTable = ({
  queryDate,
}: WeekOutlookChildProps) => {
  const asteroidsQuery = useNearEarthAsteroids(queryDate);

  if (asteroidsQuery.isLoading) {
    return (
      <section className="w-full flex flex-col">
        <h3 className="title-sm">Near Earth Asteroids</h3>

        <div className="mt-6">
          <Skeleton
            variant="rectangular"
            sx={skeletonStyle}
            width={1103}
            height={629}
          />
        </div>
      </section>
    );
  }

  if (asteroidsQuery.isError) {
    return (
      <section className="w-full min-h-[400px] flex flex-col">
        <h3 className="title-sm">Near Earth Asteroids</h3>

        <div className="h-full flex-1 flex flex-col items-center justify-center mt-6">
          <p className="body-md text-center">
            Sorry, we couldn't load Near Earth Asteroid data for this date.{' '}
            <br />
            It may not be available or there was a problem fetching it.
          </p>

          <Button onClick={() => asteroidsQuery.refetch()}>Try again</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col">
      <h3 className="title-sm">Near Earth Asteroids</h3>

      <div className="glass-bg mt-6">
        <DataGrid
          rows={asteroidsQuery.data}
          columns={columnStructure}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 40]}
          disableRowSelectionOnClick
        />
      </div>
    </section>
  );
};
