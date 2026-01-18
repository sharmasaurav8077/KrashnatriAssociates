interface FooterSectionProps {
  id?: string;
}

const FooterSection = ({ id }: FooterSectionProps) => {
  return (
    <section id={id} className="py-10 md:py-15 lg:py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Services</li>
              <li className="hover:text-white transition-colors cursor-pointer">Projects</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Service 1</li>
              <li className="hover:text-white transition-colors cursor-pointer">Service 2</li>
              <li className="hover:text-white transition-colors cursor-pointer">Service 3</li>
              <li className="hover:text-white transition-colors cursor-pointer">Service 4</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Gallery</li>
              <li className="hover:text-white transition-colors cursor-pointer">E-Brochure</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li>Email: info@example.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: Placeholder Address</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            &copy; {new Date().getFullYear()} Krashnatri Associates. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
