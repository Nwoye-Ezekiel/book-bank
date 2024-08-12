import makeApiCall from 'api';
import { BooksResponse, QueryParams } from 'types';

const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export async function getBooks(params: QueryParams) {
  return await makeApiCall<BooksResponse>(`/volumes`, 'get', '', {
    params: {
      key: apiKey,
      filter: 'full',
      Download: 'epub',
      printType: 'books',
      ...params,
    },
  });
}
