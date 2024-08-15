import { BookVolume } from 'types';
import debounce from 'lodash.debounce';
import { useInfiniteBooks } from 'data';
import BookCard from 'components/book-card';
import { useInView } from 'react-intersection-observer';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Close, KeyboardDoubleArrowDown, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, OutlinedInput } from '@mui/material';

export default function Home() {
  const maxResults = 10;
  const [search, setSearch] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const {
    data,
    isError,
    refetch,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteBooks({
    maxResults,
    startIndex,
    q: debouncedSearch || 'comics',
  });

  // Cache books data to optimize performance by recomputing only on data changes, reducing re-renders.
  const currentBooks: BookVolume[] = useMemo(() => {
    return data?.pages?.map((page) => page.items ?? []).flat() ?? [];
  }, [data]);

  // Handle changes in the search input and trigger the debounced search handler.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearchHandler(value);
  };

  // Debounced search handler to trigger search fetches after 500ms of inactivity to optimize performance.
  const debouncedSearchHandler = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setStartIndex(0);
    }, 500),
    []
  );

  // Intersection observer hook to detect when a specific element comes into view while scrolling.
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  // Fetches the next page of books when the user scrolls to the bottom of the page for infinite scrolling.
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Event listener to toggle "Scroll to Top" button visibility when the user scrolls away from the initial viewport.
  useEffect(() => {
    window.addEventListener('scroll', () => setShowButton(window.scrollY >= 1));
    return () => window.removeEventListener('scroll', () => setShowButton(window.scrollY >= 1));
  }, []);

  return (
    <div className="w-full relative p-5 pt-[7.3rem] md:p-10 md:pt-32">
      {/* Fixed header with logo and search bar */}
      <div className="border-b border-b-white/[.25] border-b-solid p-5 md:px-10 w-full grid grid-cols-12 justify-center items-center fixed top-0 left-0 bg-header z-[100]">
        <Logo className="h-auto w-8 md:w-9" />
        <div className="flex justify-end md:justify-center col-span-11 md:col-span-10">
          <OutlinedInput
            value={search}
            placeholder="Search for books"
            onChange={handleSearchChange}
            startAdornment={<Search className="mr-2 ml-0.5 text-white/[.4] p-[1px]" />}
            className="w-[calc(100%-20px)] md:w-full max-w-[40rem] bg-secondary text-white"
            endAdornment={
              search && (
                <IconButton
                  className="p-1.5 mr-0.5 hover:bg-white/[.05]"
                  onClick={() => {
                    setSearch('');
                    debouncedSearchHandler('');
                  }}
                  edge="end"
                >
                  <Close className="text-[17px] text-white/[.4]" />
                </IconButton>
              )
            }
            inputProps={{
              sx: {
                '::placeholder': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Loading state */}
      {(isLoading && currentBooks.length === 0) || (isFetching && !isFetchingNextPage) ? (
        <div className="flex items-center justify-center h-[calc(100vh-85px)] -mt-[85px] w-full py-12">
          <CircularProgress />
        </div>
      ) : isError ? (
        <>
          {/* Error state */}
          <div className="h-[calc(100vh-85px)] -mt-[85px] flex items-center justify-center w-full">
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              <div className="space-y-1 md:space-y-2">
                <h2 className="text-2xl md:text-3xl text-center text-white">An Error Occurred!</h2>
                <p className="text-[19px] md:text-xl text-center text-white/[.8]">
                  We encountered an error while fetching books.
                </p>
              </div>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </div>
        </>
      ) : currentBooks.length > 0 ? (
        <>
          {/* Books card display */}
          <div className="flex flex-wrap justify-center gap-5 md:gap-7">
            {currentBooks.map((book: BookVolume) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-5 md:mt-10 flex">
            <div ref={ref} />
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full">
                <CircularProgress size={22} />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Empty state */}
          <div className="h-[calc(100vh-85px)] -mt-[85px] flex items-center justify-center w-full">
            <h2 className="text-2xl md:text-3xl text-center text-white">No Books Found.</h2>
          </div>
        </>
      )}

      {/* Scroll to top button */}
      <div
        className={`fixed bottom-0 right-0 p-4 md:p-5 z-30 transition-opacity duration-500  ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="bg-primary hover:bg-primaryDark p-2 rounded-full shadow-md hover:shadow-lg duration-150 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <KeyboardDoubleArrowDown className="text-white text-2xl rotate-180" />
        </div>
      </div>
    </div>
  );
}
