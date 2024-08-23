import Header from 'components/header';
import { useState, useEffect } from 'react';
import BookCards from 'components/book-card';
import { KeyboardDoubleArrowDown } from '@mui/icons-material';

export default function Home() {
  const [search, setSearch] = useState('');
  const [showButton, setShowButton] = useState(false);

  // Event listener to toggle "Scroll to Top" button visibility when the user scrolls away from the initial viewport
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY >= 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full relative p-5 pt-[7.3rem] md:p-10 md:pt-32">
      <Header handleSearch={(search) => setSearch(search)} />
      <BookCards search={search} />
      <div
        className={`fixed bottom-0 right-0 p-4 md:p-5 z-30 transition-opacity duration-500  ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-primary hover:bg-primaryDark p-2 rounded-full shadow-md hover:shadow-lg duration-150 cursor-pointer"
        >
          <KeyboardDoubleArrowDown className="text-white text-2xl rotate-180" />
        </div>
      </div>
    </div>
  );
}
