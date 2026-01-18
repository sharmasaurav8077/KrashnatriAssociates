import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 md:col-span-2 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 break-words">
              Krashnatri Associates
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 break-words">
              Premium consultancy services delivering excellence and innovation
              to help your business thrive.
            </p>
          </div>

          <div className="min-w-0">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors text-sm sm:text-base break-words">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors text-sm sm:text-base break-words"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="hover:text-white transition-colors text-sm sm:text-base break-words"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="hover:text-white transition-colors text-sm sm:text-base break-words"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:krashnatriassociates@gmail.com"
                  className="hover:text-white transition-colors flex items-start sm:items-center gap-2 text-xs sm:text-sm"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="break-all min-w-0">
                    krashnatriassociates@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918410261096"
                  className="hover:text-white transition-colors flex items-center gap-2 text-xs sm:text-sm break-words"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="break-words">+91 8410261096</span>
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors text-sm sm:text-base break-words"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors text-sm sm:text-base break-words">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 md:pt-8 text-center md:text-left">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 break-words">
            &copy; {new Date().getFullYear()} Krashnatri Associates. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 opacity-60 hover:opacity-100 transition-opacity duration-200 mt-3 text-center md:text-right">
            Designed & Developed by{' '}
            <a
              href="https://www.linkedin.com/in/tushar-sarawat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-200"
            >
              Tushar Sarawat
            </a>
            {', '}
            <a
              href="https://www.linkedin.com/in/vanshika-sharma2205"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-200"
            >
              Vanshika Sharma
            </a>
            {' '}&{' '}
            <a
              href="https://www.linkedin.com/in/saurav-sharma-77a649302"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-200"
            >
              Saurav Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
