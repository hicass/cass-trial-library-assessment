import { createTheme, type Theme } from '@mui/material/styles';

export const customTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    palette: {
      mode: 'dark',
    },
  });
