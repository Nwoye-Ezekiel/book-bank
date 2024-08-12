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

  if ((isLoading && currentBooks.length === 0) || (isFetching && !isFetchingNextPage)) {
    return (
      <div className="flex items-center justify-center h-full w-full py-12 -mt-[3.15rem] lg:mt-0">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full pb-9 lg:mt-0">
        <h2>We encountered an error while fetching all assets</h2>
        <Button onClick={() => refetch()} variant="contained" color="primary">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div id="home" className="w-full relative py-32 pb-10">
      <div className="border-b border-b-white border-b-solid p-5 w-full flex justify-center items-center fixed top-0 left-0 backdrop-blur-[2.25rem]">
        <OutlinedInput
          className="hidden md:inline-flex w-[40rem] bg-transparent bg-white"
          placeholder="Search Books"
          value={search}
          onChange={handleSearchChange}
          startAdornment={<Search className="mx-2 text-gray-200" />}
          endAdornment={
            search && (
              <IconButton onClick={() => setSearch('')} edge="end" size="small">
                <Close className="text-sm" />
              </IconButton>
            )
          }
        />
      </div>
      {currentBooks.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-5">
            {currentBooks.map((book: BookVolume) => (
              <BookCover key={book.id} book={book} />
            ))}
          </div>
          <div className="my-4 flex">
            <div ref={ref} />
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full py-4">
                <CircularProgress size={22} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
}
