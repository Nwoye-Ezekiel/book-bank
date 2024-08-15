import { useState } from 'react';
import { BookVolume } from 'types';
import { Button } from '@mui/material';
import BookModal from 'components/book-modal';
import NoImage from 'assets/images/no-image.png';
import { AutoStories, CalendarMonth } from '@mui/icons-material';

const BookCard = ({ book }: { book: BookVolume }) => {
  const [hovering, setHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | BookVolume>(null);

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="w-full max-w-sm md:max-w-60 flex flex-wrap flex-col shadow-lg rounded-xl overflow-hidden bg-secondary text-white"
    >
      <div className="relative h-[20.4rem]">
        {/* Book title, authors, page count, and published date */}
        <div
          className={`flex flex-col w-full p-3 pb-4 space-y-2 absolute bottom-0 left-0 ${
            hovering ? 'duration-200 translate-y-full' : 'duration-500 translate-y-0'
          }`}
        >
          <div>
            <h2 className="text-[17px] overflow-hidden text-ellipsis whitespace-nowrap">
              {book.volumeInfo.title}
            </h2>
            <p className="overflow-hidden font-normal text-ellipsis whitespace-nowrap text-[15px] text-white/[.6]">
              {book.volumeInfo.authors?.length ?? 0 > 0
                ? book.volumeInfo.authors?.map((author, index) => {
                    return (
                      <span key={index}>
                        {index > 0 && ', '}
                        {author}
                      </span>
                    );
                  })
                : 'N/A'}
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="space-x-2 flex items-center text-sm">
              <div className="space-x-2 flex items-center text-white/[.6]">
                <AutoStories className="text-[15px]" />
                <p className="font-medium">Pages: </p>
              </div>
              <span className="text-white/[.6]">{book.volumeInfo.pageCount}</span>
            </div>
            <div className="space-x-2 flex items-center text-sm">
              <div className="space-x-2 flex items-center text-white/[.6]">
                <CalendarMonth className="text-[15px]" />
                <p className="font-medium">Published: </p>
              </div>
              <span className="text-white/[.6]">
                {book.volumeInfo.publishedDate?.slice(0, 4) ?? 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Book thumbnail */}
        <img
          alt="thumbnail"
          src={
            book.volumeInfo.imageLinks?.thumbnail ??
            book.volumeInfo.imageLinks?.smallThumbnail ??
            NoImage
          }
          className={`w-full bg-secondary text-black rounded-b-lg shadow-lg shadow-black/[.15] ${
            hovering ? 'duration-300 h-full' : 'duration-500 h-[12.5rem]'
          }`}
        />

        {/* Overlay with "View Details" button */}
        <div
          className={`absolute top-0 left-0 h-full w-full bg-black/[.75] z-20 flex flex-col justify-center items-center transform space-y-5 cursor-default ${
            hovering ? 'duration-200 opacity-100' : 'duration-500 opacity-0'
          }`}
        >
          <h2
            className={`text-white text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full px-5 text-center transform duration-500 ${
              hovering ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            {book.volumeInfo.title}
          </h2>
          <Button
            size="medium"
            onClick={() => {
              setSelectedBook(book);
              setShowModal(true);
            }}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* BookModal to show book details */}
      {selectedBook && (
        <BookModal
          open={showModal}
          book={selectedBook}
          handleClose={() => {
            setHovering(false);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BookCard;
