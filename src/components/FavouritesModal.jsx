import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";

const FavoritesModal = ({ isOpen, onClose, favorites }) => {
  const { theme } = useTheme();
  const [favoriteList, setFavoriteList] = useState(favorites);

  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        key={favorites.length}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          theme === "light" ? "bg-white" : "bg-[#36393E]"
        } rounded-lg shadow-lg p-8 relative w-full max-w-lg`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 p-2 text-xl ${
            theme === "light" ? "text-[#141414]" : "text-gray-100"
          } rounded-full`}
        >
          <IoMdClose />
        </button>
        <h2
          className={`text-2xl font-bold mb-4 text-center ${
            theme === "light" ? "text-[#141414]" : "text-gray-100"
          }`}
        >
          Favourite Colleges
        </h2>
        <div className="space-y-4">
          {favoriteList.length === 0 ? (
            <div className="text-center text-gray-500">
              No favorite colleges
            </div>
          ) : (
            favoriteList.map((college, index) => (
              <div
                key={index}
                className={`p-4 ${
                  theme === "light" ? "bg-gray-200" : "bg-[#2D3035]"
                } rounded-full shadow-3d cursor-pointer hover:shadow-3d-hover hover:bg-gray-800 ${
                  theme === "light" ? "hover:text-gray-100" : ""
                }`}
              >
                <div className="flex flex-row items-center gap-8">
                  <h3
                    className={`${
                      theme === "light" ? "text-[#141414]" : "text-gray-100"
                    } text-xl`}
                  >
                    #{index + 1}
                  </h3>
                  <h3
                    className={`${
                      theme === "light" ? "text-[#141414]" : "text-gray-100"
                    }`}
                  >
                    {college.name}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FavoritesModal;
