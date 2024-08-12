import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('components/app/home'));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen bg-black">
            <CircularProgress />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
