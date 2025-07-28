import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { NearEarthAsteroidsTable } from '../features/nearEarthAsteroids/components/NearEarthAsteroidsTable';
import { AccommodationRequestFormSection } from '../features/accommodationRequest/components/AccomodationRequestFormSection';
import { customTheme } from '../theme';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme()}>
          <main className="w-full flex flex-col items-center gap-20 p-6 overflow-hidden">
            <h1 className='title-lg'>Mars On My Mind</h1>
            <AccommodationRequestFormSection />
            <NearEarthAsteroidsTable />
          </main>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
