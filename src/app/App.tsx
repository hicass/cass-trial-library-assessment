import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NearEarthAsteroidsTable } from '../features/nearEarthAsteroids/components/NearEarthAsteroidsTable';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className='w-full overflow-hidden border'>
        <h1>Mars On My Mind</h1>
        <NearEarthAsteroidsTable />
      </main>
    </QueryClientProvider>
  );
}

export default App;
