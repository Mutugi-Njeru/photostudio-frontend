import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
