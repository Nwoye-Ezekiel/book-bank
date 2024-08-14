import { BookVolume } from 'types';
import { Button } from '@mui/material';
import { useState } from 'react';
import { AutoStories, CalendarMonth } from '@mui/icons-material';
import Modal from 'components/modal';

const Card = ({ book }: { book: BookVolume }) => {
  const [hovering, setHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | BookVolume>(null);

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="w-full max-w-md md:max-w-60 flex flex-wrap flex-col shadow-lg rounded-xl overflow-hidden bg-secondary text-white"
    >
      <div className="relative h-[20.4rem]">
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
              <div className="space-x-2 flex items-center text-white/[.8]">
                <AutoStories className="text-[15px]" />
                <h3 className="font-normal">Pages: </h3>
              </div>
              <span className="text-white/[.6]">{book.volumeInfo.pageCount}</span>
            </div>
            <div className="space-x-2 flex items-center text-sm">
              <div className="space-x-2 flex items-center text-white/[.8]">
                <CalendarMonth className="text-[15px]" />
                <h3 className="font-normal">Published: </h3>
              </div>
              <span className="text-white/[.6]">
                {book.volumeInfo.publishedDate?.slice(0, 4) ?? 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ??
            book.volumeInfo.imageLinks?.smallThumbnail ??
            ''
          }
          alt="thumbnail"
          className={`w-full bg-secondary text-black rounded-b-lg shadow-lg shadow-black/[.04] ${
            hovering ? 'duration-300 h-full' : 'duration-500 h-[12.5rem]'
          }`}
        />
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
            className="text-black"
            onClick={() => {
              setSelectedBook(book);
              setShowModal(true);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
      {selectedBook && (
        <Modal
          book={selectedBook}
          open={showModal}
          handleClose={() => {
            setShowModal(false);
            setHovering(false);
          }}
        />
      )}
    </div>
  );
};

export default Card;
