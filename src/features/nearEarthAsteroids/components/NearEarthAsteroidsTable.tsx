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
  width: '100%',
  minHeight: 629,
  p: 2,
};

const dataGridStyle = {
  minHeight: 629,
};

export const NearEarthAsteroidsTable = ({
  queryDate,
}: WeekOutlookChildProps) => {
  const asteroidsQuery = useNearEarthAsteroids(queryDate);
  const { isLoading, isError, error, data, refetch } = asteroidsQuery;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-6">
          <Skeleton variant="rectangular" sx={skeletonStyle} />
        </div>
      );
    }

    if (isError) {
      return (
        <div
          aria-live="polite"
          className="h-full flex-1 flex flex-col items-center justify-center mt-6"
        >
          <p className="body-md text-center">{error.message}</p>
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="glass-bg mt-6">
          <DataGrid
            rows={data}
            columns={columnStructure}
            getRowId={(row) => row.id}
            sx={dataGridStyle}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 40]}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: () => (
                <div className="p-4 text-center body-sm">
                  No asteroids found for these dates.
                </div>
              ),
            }}
          />
        </div>
      );
    }

    return (
      <div className="glass-bg mt-6">
        <DataGrid
          rows={data}
          columns={columnStructure}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 40]}
          sx={dataGridStyle}
          disableRowSelectionOnClick
        />
      </div>
    );
  };

  return (
    <section className="w-full min-h-[400px] flex flex-col">
      <h3 className="title-sm">Near Earth Asteroids</h3>
      {renderContent()}
    </section>
  );
};
