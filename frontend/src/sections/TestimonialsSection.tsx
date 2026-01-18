interface TestimonialsSectionProps {
  id?: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      name: 'Client Name',
      role: 'Position',
      content: 'Testimonial placeholder text goes here. This is a sample testimonial.',
    },
    {
      name: 'Client Name',
      role: 'Position',
      content: 'Testimonial placeholder text goes here. This is a sample testimonial.',
    },
    {
      name: 'Client Name',
      role: 'Position',
      content: 'Testimonial placeholder text goes here. This is a sample testimonial.',
    },
  ];

  return (
    <section id={id} className="py-10 md:py-15 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-contrast mb-4">
            Testimonials
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            What our clients say about us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 lg:p-10 shadow-md"
            >
              <p className="text-sm md:text-base text-gray-700 mb-4 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-base md:text-lg lg:text-xl font-semibold text-contrast">
                  {testimonial.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
