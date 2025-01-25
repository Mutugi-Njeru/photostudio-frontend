import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">LENS</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="hover:text-gray-600">Home</a>
              <a href="#portfolio" className="hover:text-gray-600">Portfolio</a>
              <a href="#about" className="hover:text-gray-600">About</a>
              <a href="#contact" className="hover:text-gray-600">Contact</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#home" className="block px-3 py-2 hover:text-gray-600">Home</a>
            <a href="#portfolio" className="block px-3 py-2 hover:text-gray-600">Portfolio</a>
            <a href="#about" className="block px-3 py-2 hover:text-gray-600">About</a>
            <a href="#contact" className="block px-3 py-2 hover:text-gray-600">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;