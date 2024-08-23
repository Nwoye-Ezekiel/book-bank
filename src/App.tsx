import Splash from 'components/splash';
import FontFaceObserver from 'fontfaceobserver';
import { CircularProgress } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazy-load components to split code and improve performance.
const Home = lazy(() => import('pages/home'));
const PageNotFound = lazy(() => import('pages/page-not-found'));

const App = () => {
  const queryClient = new QueryClient();
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Preload all local fonts.
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
        // Update state to indicate fonts are loaded, whether successful or not.
        setFontsLoaded(true);
      }
    }

    preloadFonts();
  }, []);

  // Hide splash screen after 3 seconds.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts.
    return () => clearTimeout(timeoutId);
  }, []);

  // Show the splash screen if it's still active or fonts haven't loaded within the default 3 seconds timeout.
  if (showSplash || !fontsLoaded) {
    return <Splash />;
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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
