import type { GridColDef } from '@mui/x-data-grid';

export const paginationModel = { page: 0, pageSize: 10 };

export const columnStructure: GridColDef[] = [
  {
    field: 'closeApproachDate',
    headerName: 'Close Approach Date',
    flex: 1,
    renderCell: (params) => `${params.value.format('MMMM D, YYYY')}`,
  },
  {
    field: 'closeApproachTime',
    headerName: 'Close Approach Time',
    flex: 0.5,
    renderCell: (params) => `${params.value.format('h:mm A')}`,
  },
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
