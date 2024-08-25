import React, { useState, useEffect } from "react";
import imageSrc1 from "../assets/images/Hero.svg";
import imageSrc2 from "../assets/images/Hero2.svg";
import imageSrc3 from "../assets/images/Hero3.svg";
import imageSrc5 from "../assets/images/Hero5.svg";
import imageSrc6 from "../assets/images/Hero6.svg";

import { Link } from "react-router-dom";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const images = [imageSrc5, imageSrc2, imageSrc3, imageSrc1, imageSrc6];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out

      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFade(true); // Start fade-in
      }, 500); // Duration of the fade-out effect
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[35rem]">
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Slideshow"
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center md:px-12">
        <h2 className="text-6xl font-semibold text-white md:text-4xl">
          "صوتك... مستقبل الأردن يبدأ هنا" بصوتك تصنع القرار و تنهض بالأردن
        </h2>
        <p className="mt-2 text-xl text-white md:text-base"></p>
        <div className="mt-6">
          <Link to="/components/votingPages/categories">
            <button className="px-5 py-3 text-sm text-center text-black bg-cyan-200 shadow-xl rounded-xl hover:text-white hover:shadow-xl ">
              صوت الآن
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
