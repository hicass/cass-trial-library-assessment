import { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useNearEarthAsteroids } from '../utils/useNearEarthAsteroids';
import { columnStructure, paginationModel } from '../utils/asteroidDataGrid';
import Button from '@mui/material/Button';
import Loader from '../../../components/ui/Loader';
import { DatePicker } from '@mui/x-date-pickers';

// Component to render the Near Earth Asteroid Table
export const NearEarthAsteroidsTable = () => {
  const [queryDate, setQueryDate] = useState<Dayjs>(dayjs());

  const asteroidsQuery = useNearEarthAsteroids(queryDate);

  if (asteroidsQuery.isLoading) {
    return <Loader />;
  }

  if (asteroidsQuery.isError) {
    return (
      <section className="glass-bg mt-10 w-full flex flex-col items-center gap-6 p-6">
        <div>
          <p className="title-sm">Unable to Load Data</p>
          <p className="mt-2">
            We couldn't retrieve asteroid data for the selected week.
            <br />
            Please check your connection or try again.
          </p>
        </div>

        <Button onClick={() => asteroidsQuery.refetch()}>Try again</Button>
      </section>
    );
  }

  return (
    <section className="mt-10 w-full">
      <DatePicker
        label="Pick a date to view the next 7 days"
        value={queryDate}
        onChange={(newValue) => {
          if (newValue) setQueryDate(newValue);
        }}
        disablePast
      />

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
