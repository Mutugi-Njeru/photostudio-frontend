import React from 'react';

const Portfolio = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      category: 'Nature'
    },
    {
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
      category: 'Portrait'
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      category: 'Wedding'
    },
    {
      url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
      category: 'Fashion'
    },
    {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      category: 'Landscape'
    },
    {
      url: 'https://images.unsplash.com/photo-1511407397940-d57f68e81203',
      category: 'Street'
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;