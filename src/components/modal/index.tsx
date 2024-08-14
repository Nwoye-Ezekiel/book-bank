import { BookVolume } from 'types';
import { Button, Chip, Dialog, IconButton } from '@mui/material';
import { AutoStories, CalendarMonth, Close, Flag } from '@mui/icons-material';

interface Props {
  open: boolean;
  book: BookVolume;
  handleClose: () => void;
}

const Modal = ({ book, open, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: 'w-full max-w-2xl rounded-2xl w-fit h-fit p-6 md:p-8 hide-scrollbar',
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

export default Modal;
