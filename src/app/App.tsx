import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import { AccommodationRequestFormSection } from '../features/accommodationRequest/components/AccommodationRequestFormSection';
import { WeekOutlookSection } from '../features/weekOutlook/components/WeekOutlookSection';
import { customTheme } from '../theme';
import './mesh-gradient.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme()}>
          <main className="h-screen w-screen flex flex-col items-center overflow-y-visible gap-20 p-6 overflow-hidden relative">
            <h1 className="title-lg">Mars On My Mind</h1>
            <WeekOutlookSection />
            <AccommodationRequestFormSection />
          </main>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
