import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { NearEarthAsteroidsTable } from '../features/nearEarthAsteroids/components/NearEarthAsteroidsTable';
import { customTheme } from '../theme';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme()}>
          <main className="w-full flex flex-col items-center overflow-hidden">
            <h1>Mars On My Mind</h1>
            <NearEarthAsteroidsTable />
          </main>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
