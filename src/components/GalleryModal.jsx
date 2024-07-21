import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const galleryVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true, // Enable arrows
};

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-gray-800 rounded-full p-2 shadow-lg z-20 opacity-70"
    onClick={onClick}
    aria-label="Previous"
  >
    <FaArrowLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-gray-800 rounded-full p-2 shadow-lg z-20 opacity-70"
    onClick={onClick}
    aria-label="Next"
  >
    <FaArrowRight />
  </button>
);

const GalleryModal = ({ isOpen, onClose, images }) => {
  const { theme } = useTheme();
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={galleryVariants}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative ${
          theme === "light" ? "bg-white" : "bg-[#36393E]"
        } p-4 rounded-3xl max-w-2xl w-full`}
      >
        <button
          className={`absolute top-4 right-4 text-2xl ${
            theme === "light" ? "text-[#141414]" : "text-gray-100"
          } cursor-pointer z-30`}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <Slider
          {...settings}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow />}
        >
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <img
                src={image}
                alt={`College Image ${index + 1}`}
                className="w-full h-[400px] object-cover rounded-lg shadow-md mt-5"
              />
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default GalleryModal;
