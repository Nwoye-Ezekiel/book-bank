import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-svh flex items-center justify-center w-full">
      <div className="flex flex-col items-center space-y-6 md:space-y-8 -mt-10">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl md:text-3xl text-center text-white font-semibold">
            Page Not Found!
          </h2>
          <p className="text-[19px] md:text-xl text-center text-white/[.5]">
            The page you are looking for does not exist.
          </p>
        </div>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    </div>
  );
};

export default PageNotFound;
