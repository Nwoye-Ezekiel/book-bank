import { BookVolume } from 'types';
import debounce from 'lodash.debounce';
import { useInfiniteBooks } from 'data';
import Card from 'components/card';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { Close, KeyboardDoubleArrowDown, Search } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useMemo, useCallback } from 'react';
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

  const currentBooks: BookVolume[] = useMemo(() => {
    return data?.pages?.map((page) => page.items ?? []).flat() ?? [];
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearchHandler(value);
  };

  const debouncedSearchHandler = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setStartIndex(0);
    }, 500),
    []
  );

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', () => setShowButton(window.scrollY >= 1));
    return () => window.removeEventListener('scroll', () => setShowButton(window.scrollY >= 1));
  }, []);

  return (
    <div className="w-full relative p-5 pt-[7.3rem] md:p-10 md:pt-32">
      <div className="border-b border-b-white/[.25] border-b-solid p-5 md:px-10 w-full grid grid-cols-12 justify-center items-center fixed top-0 left-0 bg-header z-50">
        <Logo className="h-auto w-8 md:w-9" />
        <div className="flex justify-end md:justify-center col-span-11 md:col-span-10">
          <OutlinedInput
            className="w-[calc(100%-20px)] md:w-full max-w-[40rem] bg-secondary text-white"
            placeholder="Search Books"
            value={search}
            onChange={handleSearchChange}
            startAdornment={<Search className="mx-2 text-white/[.4] p-[1px]" />}
            endAdornment={
              search && (
                <IconButton
                  className="mr-0.5 hover:bg-white/[.05]"
                  onClick={() => {
                    setSearch('');
                    debouncedSearchHandler('');
                  }}
                  edge="end"
                >
                  <Close className="text-[18px] text-white/[.4]" />
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
      {(isLoading && currentBooks.length === 0) || (isFetching && !isFetchingNextPage) ? (
        <div className="flex items-center justify-center h-[calc(100vh-85px)] -mt-[85px] w-full py-12">
          <CircularProgress />
        </div>
      ) : isError ? (
        <div className="h-[calc(100vh-85px)] -mt-[85px] flex items-center justify-center w-full">
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            <div className="space-y-1 md:space-y-2">
              <h2 className="text-2xl md:text-3xl text-center text-white">An Error Occurred!</h2>
              <p className="text-xl md:text-[22px] text-center text-white/[.8]">
                We encountered an error while fetching books.
              </p>
            </div>
            <Button
              className="w-fit text-lg"
              onClick={() => refetch()}
              variant="contained"
              color="primary"
            >
              Retry
            </Button>
          </div>
        </div>
      ) : currentBooks.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-5 md:gap-7">
            {currentBooks.map((book: BookVolume) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-5 md:mt-10 flex">
            <div ref={ref} />
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full">
                <Button disabled type="button" variant="contained" className="w-40 bg-primary/[.1]">
                  <CircularProgress size={22} />
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-[calc(100vh-85px)] -mt-[85px] flex items-center justify-center w-full">
          <h2 className="text-3xl text-center text-white">No Books Found.</h2>
        </div>
      )}
      <div
        className={`fixed bottom-0 right-0 p-4 md:p-5 z-30 transition-opacity duration-500 ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="bg-primary p-2 rounded-full shadow-md hover:shadow-lg duration-150 cursor-pointer"
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
