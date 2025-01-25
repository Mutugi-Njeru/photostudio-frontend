import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5"
              alt="Photographer"
              className="rounded-lg shadow-lg w-full h-[600px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-6">
              With over 10 years of experience in photography, I specialize in capturing life's most precious moments. 
              My passion lies in creating timeless images that tell your unique story.
            </p>
            <p className="text-gray-600 mb-6">
              From intimate weddings to grand landscapes, I bring a creative eye and technical expertise to every shoot. 
              My work has been featured in various publications and exhibitions around the world.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">500+</h3>
                <p className="text-gray-600">Photo Sessions</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">100+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;