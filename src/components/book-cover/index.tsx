import { BookVolume } from 'types';
import { Button, Chip, Dialog, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { AutoStories, CalendarMonth, Close, Flag } from '@mui/icons-material';

interface ModalProps {
  book: BookVolume;
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ book, open, handleClose }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: 'w-full max-w-2xl rounded-2xl w-fit h-fit p-6 lg:p-8 hide-scrollbar',
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-[22px] text-primary font-semibold">Book Details</h2>
        <IconButton
          className="bg-primary w-7 h-7 justify-self-end"
          size="small"
          onClick={handleClose}
        >
          <Close className="p-1.5 text-white" />
        </IconButton>
      </div>
      <div className="flex w-full space-x-5 mt-5">
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ??
            book.volumeInfo.imageLinks?.smallThumbnail ??
            ''
          }
          alt="thumbnail"
          className={`w-[calc(100%-120px)] h-80 bg-white text-black rounded-lg shadow-lg shadow-black/[.04]`}
        />
        <div className="flex flex-col justify-center items-center gap-5 w-[120px] bg-primary/[.05] rounded-lg shadow-lg shadow-black/[.04]">
          <div className="gap-2 flex flex-col items-center text-gray-700">
            <CalendarMonth className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <h3 className="text-black">{book.volumeInfo.publishedDate}</h3>
              <p className="text-sm">Published</p>
            </div>
          </div>
          <div className="gap-2 flex flex-col items-center text-gray-700">
            <AutoStories className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <h3 className="text-black">{book.volumeInfo.pageCount}</h3>
              <p className="text-sm">Pages</p>
            </div>
          </div>
          <div className="gap-2 flex flex-col items-center text-gray-700">
            <Flag className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <img src={`https://flagsapi.com/${book.accessInfo.country}/shiny/24.png`} />
              <p className="text-sm">{book.accessInfo.country}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-0.5">{book.volumeInfo.title}</h2>
        <p className="space-x-2">
          <span className="font-clash font-medium text-primary">Authors:</span>
          {book.volumeInfo.authors?.length ?? 0 > 0
            ? book.volumeInfo.authors?.map((author, index) => {
                return (
                  <span key={index}>
                    {index > 0 && ', '}
                    {author}
                  </span>
                );
              })
            : 'Unknown'}
        </p>
        <p className="space-x-2">
          <span className="font-clash font-medium text-primary">Publisher:</span>
          <span>{book.volumeInfo.publisher ?? 'Unknown'}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2.5">
        {book.volumeInfo.categories?.map((category, index) => (
          <Chip
            key={index}
            color="primary"
            variant="outlined"
            className="bg-primary/[.05]"
            label={<span className="text-primary font-normal">{category}</span>}
          />
        ))}
      </div>

      <div className="mt-5 space-y-1">
        <h2 className="text-xl font-medium">Description</h2>
        <p className="text-[17px]">{book.volumeInfo.description ?? 'No Description.'}</p>
      </div>

      <Button
        size="large"
        className="mt-6"
        onClick={() => window.open(book.accessInfo.epub.downloadLink)}
      >
        View Book
      </Button>
    </Dialog>
  );
};

export default function BookCover({ book }: { book: BookVolume }) {
  const [hovering, setHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | BookVolume>(null);

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="w-60 flex flex-wrap flex-col shadow-lg rounded-xl overflow-hidden bg-[#262626] text-white"
    >
      <div className="relative h-[22.5rem]">
        <div
          className={`flex flex-col w-full p-3 pb-4 space-y-2 absolute bottom-0 left-0 ${
            hovering ? 'duration-200 translate-y-full' : 'duration-500 translate-y-0'
          }`}
        >
          <div>
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">
              {book.volumeInfo.title}
            </h2>
            <p className="overflow-hidden font-normal text-ellipsis whitespace-nowrap text-sm text-white/[.5]">
              {book.volumeInfo.authors?.length ?? 0 > 0
                ? book.volumeInfo.authors?.map((author, index) => {
                    return (
                      <span key={index}>
                        {index > 0 && ', '}
                        {author}
                      </span>
                    );
                  })
                : 'Unknown'}
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="space-x-2 flex text-sm">
              <div className="space-x-2 flex items-center text-white/[.6]">
                <AutoStories className="text-[15px]" />
                <h3>Pages: </h3>
              </div>
              <span className="text-white/[.5]">{book.volumeInfo.pageCount}</span>
            </div>
            <div className="space-x-2 flex text-sm">
              <div className="space-x-2 flex items-center text-white/[.6]">
                <CalendarMonth className="text-[15px]" />
                <h3>Published: </h3>
              </div>
              <span className="text-white/[.5]">{book.volumeInfo.publishedDate}</span>
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
          className={`w-full bg-white text-black bg-no-repeat bg-cover bg-center rounded-b-lg shadow-lg shadow-black/[.04] ${
            hovering ? 'duration-300 h-full' : 'duration-500 h-[15rem]'
          }`}
        />
        <div
          className={`absolute top-0 left-0 h-full w-full bg-black/[.7] z-20 flex flex-col justify-center items-center transform space-y-5 cursor-default ${
            hovering ? 'duration-200 opacity-100' : 'duration-500 opacity-0'
          }`}
        >
          <h2
            className={`text-white text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-[15rem] px-5 text-center transform duration-500 ${
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
}
