import { BookVolume } from 'types';
import debounce from 'lodash.debounce';
import { useInfiniteBooks } from 'data';
import BookCover from 'components/book-cover';
import { Close, Search } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, CircularProgress, IconButton, OutlinedInput } from '@mui/material';

export default function Home() {
  const maxResults = 10;
  const [search, setSearch] = useState('');
  const [startIndex, setStartIndex] = useState(0);
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
    orderBy: 'relevance',
    q: debouncedSearch || 'react',
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

  return (
    <div className="w-full relative pt-32 pb-5 lg:pb-10 p-5 lg:px-10">
      <div className="border-b border-b-white/[.3] border-b-solid p-5 w-full flex justify-center items-center fixed top-0 left-0 backdrop-blur-[1rem] z-50">
        <OutlinedInput
          className="w-full max-w-[40rem] bg-[#262626] text-white"
          placeholder="Search Books"
          value={search}
          onChange={handleSearchChange}
          startAdornment={<Search className="mx-2 text-white/[.3] p-[1px]" />}
          endAdornment={
            search && (
              <IconButton
                className="mr-0.5 hover:bg-white/[.05]"
                onClick={() => setSearch('')}
                edge="end"
              >
                <Close className="text-[18px] text-white/[.3]" />
              </IconButton>
            )
          }
          inputProps={{
            sx: {
              '::placeholder': {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            },
          }}
        />
      </div>
      {(isLoading && currentBooks.length === 0) || (isFetching && !isFetchingNextPage) ? (
        <div className="flex items-center justify-center h-[calc(100vh-85px)] -mt-[85px] w-full py-12">
          <CircularProgress />
        </div>
      ) : isError ? (
        <div className="h-screen flex items-center justify-center w-full">
          <div className="flex flex-col items-center space-y-5 max-w-md">
            <h2 className="text-3xl text-center">We encountered an error while fetching books</h2>
            <Button className="w-fit" onClick={() => refetch()} variant="contained" color="primary">
              Retry
            </Button>
          </div>
        </div>
      ) : currentBooks.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-7">
            {currentBooks.map((book: BookVolume) => (
              <BookCover key={book.id} book={book} />
            ))}
          </div>
          <div className="my-4 flex">
            <div ref={ref} />
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full py-4">
                <Button disabled type="button" variant="contained" className="w-40 bg-primary/[.1]">
                  <CircularProgress size={22} />
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-[calc(100vh-85px)] -mt-[85px] flex items-center justify-center w-full">
          <h2 className="text-3xl text-center">No Books Found.</h2>
        </div>
      )}
    </div>
  );
}
