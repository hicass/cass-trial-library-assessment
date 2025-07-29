import { type Dayjs } from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useNearEarthAsteroids } from '../utils/useNearEarthAsteroids';
import { columnStructure, paginationModel } from '../utils/asteroid-data-grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

const tableStyle = {
  width: '100%',
  minHeight: 629,
};

// Displays a table of near-Earth asteroids for a given date, with loading, error, and empty states.
export const NearEarthAsteroidsTable = ({
  queryDate,
}: {queryDate: Dayjs}) => {
  const asteroidsQuery = useNearEarthAsteroids(queryDate);
  const { isLoading, isError, error, data, refetch } = asteroidsQuery;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="mt-6">
          <Skeleton variant="rectangular" sx={tableStyle} />
        </div>
      );
    }

    if (isError) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';

      return (
        <div
          aria-live="polite"
          className="h-full flex-1 flex flex-col items-center justify-center mt-6"
        >
          <p className="body-md text-center">{errorMessage}</p>
          <Button
            aria-label="Retry loading asteroids data"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="glass-bg mt-6">
          <DataGrid
            rows={data ?? []}
            columns={columnStructure}
            getRowId={(row) => row.id}
            sx={tableStyle}
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
          sx={tableStyle}
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
