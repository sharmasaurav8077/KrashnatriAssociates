import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Krashnatri Associates"
        description="The page you are looking for could not be found. Return to our homepage to explore our survey and consultancy services."
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md w-full">
          <h1 className="text-6xl sm:text-7xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              to="/contact"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
