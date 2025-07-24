import { useMemo } from 'react';
import { formatNearEarthAsteroidsData } from '../utils/format-near-earth-asteroids-data';
import { useNearEarthAsteroids } from '../utils/useNearEarthAsteroids';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

export const NearEarthAsteroidsTable = () => {
  const asteroidsQuery = useNearEarthAsteroids();

  // console.log(asteroidsQuery.data)

  const asteroidsData = useMemo(() => {
    if (!asteroidsQuery.data) return [];

    return formatNearEarthAsteroidsData(asteroidsQuery.data.near_earth_objects);
  }, [asteroidsQuery.data]);

  if (asteroidsQuery.isLoading) return <p>Loading...</p>;
  if (asteroidsQuery.isError) return <p>Error loading asteroid information</p>;

  const paginationModel = { page: 0, pageSize: 10 };

  const columns: GridColDef[] = [
    { field: 'closeApproachDate', headerName: 'Close Approach Date', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    {
      field: 'potentiallyHazardous',
      headerName: 'Potential Hazard',
      flex: 0.5,
    },
    {
      field: 'missDistanceKm',
      headerName: 'Miss Distance',
      flex: 1,
      renderCell: (params) => `${params.value} km`,
    },
    { field: 'absoluteMagnitudeH', headerName: 'Magnitude', flex: 0.5 },
    {
      field: 'relativeVelocityKph',
      headerName: 'Relative Velocity',
      flex: 1,
      renderCell: (params) => `${params.value} km/h`,
    },
    {
      field: 'estimatedDiameterMaxKm',
      headerName: 'Max Estimated Diameter',
      flex: 1,
      renderCell: (params) => `${params.value} km`,
    },
    {
      field: 'estimatedDiameterMinKm',
      headerName: 'Min Estimated Diameter',
      flex: 1,
      renderCell: (params) => `${params.value} km`,
    },
  ];

  return (
    <section className="border w-full">
      <DataGrid
        rows={asteroidsData}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 40]}
        sx={{ border: 0 }}
      />
    </section>
  );
};
