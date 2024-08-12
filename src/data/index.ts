import { QueryParams } from 'types';
import { getBooks } from 'api/books';
import { useInfiniteQuery } from 'react-query';

export function useInfiniteBooks(params: QueryParams) {
  return useInfiniteQuery(
    ['infinite-books', params.maxResults, params.q, params.orderBy],
    async ({ pageParam = 0 }) => {
      const response = await getBooks({ ...params, startIndex: pageParam });
      return {
        ...response,
        nextPageParam: pageParam + params.maxResults,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.items && lastPage.items.length < params.maxResults) {
          return undefined;
        }
        return lastPage.nextPageParam;
      },
      refetchOnWindowFocus: false,
    }
  );
}
