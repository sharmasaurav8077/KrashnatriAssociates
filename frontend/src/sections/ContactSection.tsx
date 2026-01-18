import { Link } from 'react-router-dom';

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  return (
    <section id={id} className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-3 sm:mb-4 md:mb-4 lg:mb-6 break-words">
            Ready to Get Started?
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-10 max-w-2xl mx-auto break-words">
            Contact us today for expert consultancy services and regulatory compliance support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full mb-4 sm:mb-0">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-primary-500 text-white px-6 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl hover:bg-primary-600 transition-all duration-200 transform hover:scale-105 text-center whitespace-nowrap"
            >
              Get Quote
            </Link>
          </div>
          <p className="text-xs sm:text-sm md:text-sm text-gray-500 mt-4 sm:mt-5 md:mt-6 break-words px-2">
            Or use the WhatsApp button to chat with us directly
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
