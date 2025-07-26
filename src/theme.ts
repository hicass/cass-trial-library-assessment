import { createTheme, type ThemeOptions } from '@mui/material/styles';
import '@mui/x-data-grid/themeAugmentation';

export const customTheme = (theme: ThemeOptions = {}) =>
  createTheme({
    ...theme,
    palette: {
      mode: 'dark',
      primary: {
        main: '#d8732f',
      },
      secondary: {
        main: '#3f53d2',
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
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  });
