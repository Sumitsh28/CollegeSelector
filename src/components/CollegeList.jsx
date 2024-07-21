import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const CollegeList = ({ clgs, handleClgClick, showClgList }) => {
  const { theme } = useTheme();
  return (
    <ul className="space-y-4">
      {clgs.map((clg, index) => (
        <motion.li
          key={clg.id}
          className={`p-4 ${
            theme === "light" ? "bg-gray-200" : "bg-[#2D3035]"
          } rounded-full shadow-3d cursor-pointer hover:shadow-3d-hover hover:bg-gray-800 ${
            theme === "light" && "hover:text-gray-100"
          } flex items-start md:items-center`}
          onClick={() => handleClgClick(clg)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={`${
              theme === "light" ? "text-[#141414]" : "text-gray-100"
            } mr-5 text-xl whitespace-nowrap`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            #{index + 1}
          </motion.span>
          <motion.img
            src={clg.img}
            alt={`${clg.name}`}
            className="w-12 h-12 rounded-full inline-block mr-4 flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className={`${
              theme === "light" ? "text-[#141414]" : "text-gray-100"
            } flex-grow`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <span>{clg.name}</span>
          </motion.div>
        </motion.li>
      ))}
    </ul>
  );
};

export default CollegeList;
