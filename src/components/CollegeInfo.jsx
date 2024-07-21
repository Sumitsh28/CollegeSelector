import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import MapModal from "./MapModal";
import GalleryModal from "./GalleryModal";
import { GrGallery } from "react-icons/gr";

const animationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const itemHoverVariants = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.1 },
  },
};

const CollegeInfo = ({
  selectedClg,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}) => {
  const { theme } = useTheme();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // State for gallery popup

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleOpenGallery = () => {
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(selectedClg.name);
    } else {
      addToFavorites();
    }
  };

  return selectedClg ? (
    <>
      <motion.div
        key={selectedClg.id}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        variants={animationVariants}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.img
            key={selectedClg.img}
            src={selectedClg.img}
            alt={selectedClg.name}
            className="w-32 h-32 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-5">
            <motion.h2
              key={selectedClg.name}
              className={`text-2xl text-center p-4 ${
                theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
              } rounded-full shadow-3d cursor-pointer hover:shadow-3d-hover ${
                theme === "light" && "text-gray-200"
              }`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover="hover"
              variants={itemHoverVariants}
            >
              {selectedClg.name}
            </motion.h2>
            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover="hover"
              variants={itemHoverVariants}
              className={` px-4 py-2 ${
                theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
              } ${
                theme === "light" && "text-gray-200"
              } rounded-full shadow-md flex flex-row items-center justify-center gap-3 text-lg `}
              onClick={handleOpenGallery}
            >
              <GrGallery />
              Gallery
            </motion.button>
          </div>
        </div>
        <div className="items-center mt-16 flex flex-row justify-center gap-8">
          <motion.p
            key={selectedClg.location}
            className={`text-lg mb-4 p-4 ${
              theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
            } lg:rounded-full rounded-3xl shadow-3d cursor-pointer`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover="hover"
            variants={itemHoverVariants}
          >
            <div className="flex lg:flex-row flex-col justify-center w-full text-center gap-2">
              <span className="text-xl font-bold">Location</span>
              <span className="hidden lg:block">|</span>
              <span className="italic text-gray-200">
                {selectedClg.location}
              </span>
            </div>
          </motion.p>

          <motion.p
            className={`text-lg mb-4 p-4 ${
              theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
            } rounded-full shadow-3d cursor-pointer`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover="hover"
            variants={itemHoverVariants}
            onClick={handleOpenMap}
          >
            <div className="flex lg:flex-row flex-col justify-center w-full text-center gap-2 text-2xl">
              <MdLocationPin />
            </div>
          </motion.p>
        </div>

        <motion.p
          className={`text-lg mb-4 p-4 ${
            theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
          } rounded-3xl shadow-3d cursor-pointer mt-5`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover="hover"
          variants={itemHoverVariants}
        >
          <div className="flex flex-col justify-center w-full text-center gap-2">
            <span className="text-xl font-bold">Courses</span>

            {selectedClg.courses.map((course, index) => (
              <span className="italic text-gray-200" key={index}>
                {course}
              </span>
            ))}
          </div>
        </motion.p>
        <motion.button
          className={`text-lg mb-4 p-3 ${
            theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
          } rounded-3xl shadow-3d cursor-pointer mt-5`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover="hover"
          variants={itemHoverVariants}
          onClick={handleFavoriteToggle}
        >
          <div className="flex flex-row text-center gap-2 items-center justify-center">
            {isFavorite ? (
              <IoStarSharp className="font-semibold text-xl" />
            ) : (
              <IoStarOutline className="font-semibold text-xl" />
            )}
            <span className="text-xl">
              {isFavorite ? "Remove" : "Add to favorites"}
            </span>
          </div>
        </motion.button>
      </motion.div>
      <MapModal
        isOpen={isMapOpen}
        onClose={handleCloseMap}
        location={selectedClg.coordinates}
      />
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        images={selectedClg.gallery}
      />
    </>
  ) : (
    <div className="text-center text-gray-500">
      Select a college to see details
    </div>
  );
};

export default CollegeInfo;
