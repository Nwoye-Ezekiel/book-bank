import FontFaceObserver from 'fontfaceobserver';
import { CircularProgress } from '@mui/material';
import SplashScreen from 'components/splash-screen';
import { lazy, Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('components/pages/home'));
const PageNotFound = lazy(() => import('components/pages/page-not-found'));

function App() {
  const queryClient = new QueryClient();
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function preloadFonts() {
      try {
        await Promise.all([
          new FontFaceObserver('backline').load(),
          new FontFaceObserver('proxima-nova').load(),
          new FontFaceObserver('clash-grotesk').load(),
          new FontFaceObserver('cabinet-grotesk').load(),
        ]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error preloading fonts:', error);
      } finally {
        setFontsLoaded(true);
      }
    }
    preloadFonts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (showSplash || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen">
            <CircularProgress />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
