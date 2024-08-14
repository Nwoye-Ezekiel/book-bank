import { BookVolume } from 'types';
import { Button, Chip, Dialog, IconButton } from '@mui/material';
import { AutoStories, CalendarMonth, Close, Language } from '@mui/icons-material';

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
        className:
          'w-full mx-5 md:mx-10 max-h-[calc(100%-40px)] md:max-h-[calc(100%-80px)] max-w-2xl rounded-2xl w-fit h-fit p-6 md:p-8 hide-scrollbar bg-secondary text-white/[.65]',
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(3px)',
            bgcolor: 'rgba(0, 0, 0, 0.85)',
          },
        },
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-[22px] text-white font-semibold">Book Details</h2>
        <IconButton
          className="bg-black/[.12] w-8 h-8 justify-self-end"
          size="small"
          onClick={handleClose}
        >
          <Close className="p-1 text-white" />
        </IconButton>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-5 mt-4 md:mt-5">
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ??
            book.volumeInfo.imageLinks?.smallThumbnail ??
            ''
          }
          alt="thumbnail"
          className={`w-full md:w-[calc(100%-140px)] h-80 bg-black/[.12] text-black rounded-lg shadow-lg shadow-black/[.04]`}
        />
        <div className="flex flex-shrink-0 flex-row md:flex-col justify-between items-center gap-5 md:w-[120px]">
          <div className="gap-2 flex flex-col items-center text-white/[.7] w-1/3 md:w-full bg-black/[.12] rounded-lg py-2 md:py-2.5 px-3">
            <CalendarMonth className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <h3 className="text-white">{book.volumeInfo.publishedDate?.slice(0, 4) ?? 'N/A'}</h3>
              <p className="text-sm text-white/[.55]">Published</p>
            </div>
          </div>
          <div className="gap-2 flex flex-col items-center text-white/[.7] w-1/3 md:w-full bg-black/[.12] rounded-lg py-2 md:py-2.5 px-3">
            <AutoStories className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <h3 className="text-white">{book.volumeInfo.pageCount}</h3>
              <p className="text-sm text-white/[.55]">Pages</p>
            </div>
          </div>
          <div className="gap-2 flex flex-col items-center text-white/[.7] w-1/3 md:w-full bg-black/[.12] rounded-lg py-2 md:py-2.5 px-3">
            <Language className="text-primary text-[17px] mt-1" />
            <div className="flex flex-col items-center">
              <h3 className="text-white uppercase">{book.volumeInfo.language}</h3>
              <p className="text-sm text-white/[.55]">Language</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-6 md:mt-7 border-t border-t-solid border-t-white/[.15]" />
      <div className="mt-4 md:mt-5">
        <h2 className="text-[22px] md:text-2xl font-semibold mb-0.5 text-primary">
          {book.volumeInfo.title}
        </h2>
        <p className="flex space-x-2">
          <span className="font-clash font-medium text-white">Authors:</span>
          <div>
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
          </div>
        </p>
        <p className="space-x-2">
          <span className="font-clash font-medium text-white">Publisher:</span>
          <span>{book.volumeInfo.publisher ?? 'N/A'}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3">
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
        <h2 className="text-xl md:text-[22px] font-semibold text-white">Description</h2>
        <p className="text-[17px]">{book.volumeInfo.description ?? 'No Description.'}</p>
      </div>
      <Button
        size="large"
        className="mt-5 md:mt-6"
        onClick={() =>
          window.open(book.volumeInfo.previewLink ?? book.accessInfo.epub.downloadLink)
        }
      >
        View Book
      </Button>
    </Dialog>
  );
};

export default Modal;
