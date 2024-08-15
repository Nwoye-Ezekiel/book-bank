import makeApiCall from 'api';
import { QueryParams, BooksResponse } from 'types';

const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export async function getBooks(params: QueryParams) {
  return await makeApiCall<BooksResponse>(`/volumes`, 'get', '', {
    params: {
      key: apiKey,
      filter: 'full',
      orderBy: 'newest',
      printType: 'books',
      ...params,
    },
  });
}
