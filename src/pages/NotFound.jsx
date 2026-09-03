import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-4 text-center text-white">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
        Oops! This court doesn&apos;t exist.
      </h2>
      <p className="mt-3 max-w-md text-gray-300">
        The page you are looking for might have been moved or removed. Let&apos;s
        get you back to booking your next game.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
      >
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
