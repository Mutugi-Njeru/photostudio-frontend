import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center relative"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Capturing Moments
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Professional Photography Services
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Book Session
        </button>
      </div>
    </section>
  );
};

export default Hero;
