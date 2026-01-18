const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Tech Innovations Inc.',
      content:
        'Krashnatri Associates transformed our business operations. Their strategic insights and hands-on approach helped us scale efficiently while maintaining our company culture.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Director, Healthcare Systems',
      content:
        'The team at Krashnatri Associates understood our unique challenges and delivered solutions that exceeded our expectations. Highly professional and results-driven.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'CFO, Financial Services Group',
      content:
        'Outstanding consultancy services. They helped us navigate complex regulatory requirements while modernizing our systems. The ROI was evident within months.',
      rating: 5,
    },
    {
      name: 'David Thompson',
      role: 'Operations Manager, Manufacturing Co.',
      content:
        'Their expertise in operations optimization helped us reduce costs significantly while improving quality. The team was responsive, knowledgeable, and easy to work with.',
      rating: 5,
    },
    {
      name: 'Lisa Wang',
      role: 'VP Strategy, Retail Enterprises',
      content:
        'Krashnatri Associates provided invaluable guidance during our digital transformation. Their change management approach ensured smooth implementation with minimal disruption.',
      rating: 5,
    },
    {
      name: 'Robert Martinez',
      role: 'Founder, Startup Ventures',
      content:
        'As a startup, we needed strategic advice that was both practical and scalable. Krashnatri Associates delivered exactly that, helping us build a solid foundation for growth.',
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Hear from our satisfied clients
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Repeat Client Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
