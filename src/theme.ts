import { createTheme, type ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const customTheme = (theme: ThemeOptions = {}) =>
  createTheme({
    ...theme,
    palette: {
      mode: 'dark',
      primary: {
        main: '#cc653f',
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiDateCalendar: {
        styleOverrides: {
          root: {
            border: '0.05px solid #433f3e9b',
            backgroundColor: '#0E0C0C',
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            border: '0.5px solid #43403eac',
            borderRadius: '8px',
            p: 2,
          },
        },
      },
    },
  });
