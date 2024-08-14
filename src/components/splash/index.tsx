import { ReactComponent as Logo } from 'assets/images/logo.svg';

export default function Splash() {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-10 md:space-y-12">
        <div className="flex flex-col items-center space-y-3 -mt-10">
          <Logo className="h-auto w-32 md:w-40" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Book Bank</h1>
        </div>
        <div className="loader" />
      </div>
    </div>
  );
}
