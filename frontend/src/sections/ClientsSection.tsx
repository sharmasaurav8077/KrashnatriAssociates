interface ClientsSectionProps {
  id?: string;
}

const ClientsSection = ({ id }: ClientsSectionProps) => {
  const clients = [
    { name: 'Client 1', logo: 'Logo' },
    { name: 'Client 2', logo: 'Logo' },
    { name: 'Client 3', logo: 'Logo' },
    { name: 'Client 4', logo: 'Logo' },
    { name: 'Client 5', logo: 'Logo' },
    { name: 'Client 6', logo: 'Logo' },
  ];

  return (
    <section id={id} className="py-10 md:py-15 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-4">
            Our Clients
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 md:p-8 lg:p-10 flex items-center justify-center min-h-[100px] md:min-h-[120px] lg:min-h-[140px] hover:bg-gray-100 hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm md:text-base lg:text-lg text-gray-600 font-medium">
                {client.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
