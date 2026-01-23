import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-950 text-white">
      <h1 className="text-9xl font-bold text-indigo-400">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/home/explore"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
