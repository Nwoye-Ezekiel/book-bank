import { BookVolume } from 'types';
import { useInfiniteBooks } from 'data';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, CircularProgress } from '@mui/material';

const BookCards = ({
  search,
  BookCard,
}: {
  search: string;
  BookCard: React.FC<{ book: BookVolume }>;
}) => {
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
    maxResults: 10,
    startIndex: 0,
    q: search || 'comics',
  });

  // Cache books data to optimize performance
  const currentBooks: BookVolume[] = useMemo(() => {
    return data?.pages?.map((page) => page.items ?? []).flat() ?? [];
  }, [data]);

  // Intersection observer hook to detect when a specific element comes into view while scrolling
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  // Fetches the next page of books when the user scrolls to the bottom of the page for infinite scrolling
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
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
                <p className="text-[19px] md:text-xl text-center text-white/[.5]">
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
    </>
  );
};

export default BookCards;
