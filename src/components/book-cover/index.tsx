import React from 'react';
import { BookVolume } from 'types';

export default function BookCover({ book }: { book: BookVolume }) {
  return (
    <div className="w-60 h-80 flex flex-wrap flex-col shadow-lg rounded-xl overflow-hidden bg-white">
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail ?? book.volumeInfo.imageLinks?.smallThumbnail ?? ''
        }
        alt="thumbnail"
        className="w-full h-[15rem] bg-white text-black bg-no-repeat bg-cover bg-center rounded-b-lg"
      />

      <div className="flex flex-col space-y-1 w-full p-3">
        <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">{book.volumeInfo.title}</h2>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {book.volumeInfo.authors?.[0] ?? 'Unknown'}
        </p>
      </div>
    </div>
  );
}
