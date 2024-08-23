import debounce from 'lodash.debounce';
import { Close, Search } from '@mui/icons-material';
import { useState, useCallback, useRef } from 'react';
import { IconButton, OutlinedInput } from '@mui/material';
import { ReactComponent as Logo } from 'assets/images/logo.svg';

export default function Header({ handleSearch }: { handleSearch: (search: string) => void }) {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle changes in the search input and trigger the debounced search handler.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearchHandler(value);
  };

  // Debounced search handler to trigger search fetches after 500ms of inactivity to optimize performance.
  const debouncedSearchHandler = useCallback(
    debounce((value: string) => {
      handleSearch(value);
    }, 500),
    []
  );

  return (
    <div className="border-b border-b-white/[.25] border-b-solid p-5 md:px-10 w-full grid grid-cols-12 justify-center items-center fixed top-0 left-0 bg-background z-[100]">
      <Logo
        className="h-auto w-8 md:w-9 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <div className="flex justify-end md:justify-center col-span-11 md:col-span-10">
        <OutlinedInput
          value={search}
          inputRef={inputRef}
          placeholder="Search for books"
          onChange={handleSearchChange}
          startAdornment={<Search className="mr-2 ml-0.5 text-white/[.4] p-[1px]" />}
          className="w-[calc(100%-20px)] md:w-full max-w-[40rem] bg-secondary text-white"
          endAdornment={
            search && (
              <IconButton
                className="p-1.5 mr-0.5 hover:bg-white/[.05]"
                onClick={() => {
                  setSearch('');
                  debouncedSearchHandler('');
                  inputRef?.current?.focus();
                }}
                edge="end"
              >
                <Close className="text-[17px] text-white/[.4]" />
              </IconButton>
            )
          }
          sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-primary)',
            },
          }}
        />
      </div>
    </div>
  );
}
