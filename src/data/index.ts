import { QueryParams } from 'types';
import { getBooks } from 'api/books';
import { useInfiniteQuery } from 'react-query';

export function useInfiniteBooks(params: QueryParams) {
  return useInfiniteQuery(
    ['infinite-books', params.startIndex, params.q],
    async ({ pageParam = 0 }) => {
      const response = await getBooks({ ...params, startIndex: pageParam });
      return {
        ...response,
        nextPageParam: pageParam + params.maxResults,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        // If the last page has fewer items than maxResults, it indicates the end of available data.
        if (lastPage.items && lastPage.items.length < params.maxResults) {
          return undefined;
        }

        // Otherwise, calculate the next page parameter
        return lastPage.nextPageParam;
      },
      refetchOnWindowFocus: false,
    }
  );
}
