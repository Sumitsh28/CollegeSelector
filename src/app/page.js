"use client";

import { useState, useEffect } from "react";
import { data as clgData } from "../../src/data/data.js";
import { useTheme } from "../../src/context/ThemeContext.jsx";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import Loader from "../../src/components/Loader.jsx";

import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

import dynamic from "next/dynamic";

const CollegeList = dynamic(
  () => import("../../src/components/CollegeList.jsx"),
  { ssr: false }
);
const CollegeInfo = dynamic(
  () => import("../../src/components/CollegeInfo.jsx"),
  { ssr: false }
);
const FavoritesModal = dynamic(
  () => import("@/components/FavouritesModal.jsx"),
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  const [clgs, setClgs] = useState([]);
  const [selectedClg, setSelectedClg] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClgList, setShowClgList] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    try {
      setClgs(clgData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data);

        if (favorites.length === 0) {
          setFavorites(res.data.data.favorites || []);
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        setError(error);
      }
    };

    console.log("Fetching user details");
    getUserDetails();
  }, [favorites]);

  const handleClgClick = (clg) => {
    setSelectedClg(clg);
    toggleClgList();
  };

  const toggleClgList = () => {
    setShowClgList(!showClgList);
  };

  const handleUserClick = () => {
    if (data) {
      setShowDropdown(!showDropdown);
    } else {
      router.push("/login");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  const addToFavorites = async () => {
    try {
      await axios.post("/api/users/addfav", {
        userId: data._id,
        college: {
          name: selectedClg.name,
          photoUrl: selectedClg.img,
        },
      });

      setFavorites([...favorites, selectedClg]);
      toast.success("College added to favorites");
    } catch (error) {
      toast.error("Error adding college to favorites");
      console.error(error);
    }
  };

  const removeFromFavorites = async (collegeName) => {
    try {
      await axios.post("/api/users/remfav", {
        userId: data._id,
        collegeName,
      });
      setFavorites(
        favorites.filter((favorite) => favorite.name !== collegeName)
      );
      toast.success("College removed from favorites");
    } catch (error) {
      toast.error("Error removing college from favorites");
      console.error(error);
    }
  };

  const isFavorite = selectedClg
    ? favorites.some((fav) => fav.name === selectedClg.name)
    : false;

  return (
    <div
      className={`min-h-screen flex font-abc ${
        theme === "light" ? "bg-white" : "bg-[#36393E]"
      }`}
    >
      <div className="lg:hidden">
        <div className="fixed inset-0 bg-none bg-opacity-75 z-50 overflow-y-scroll">
          <div
            className={`w-[75%] p-4 ${
              theme === "light" ? "bg-gray-400" : "bg-[#202226]"
            } h-screen overflow-y-scroll rounded-r-3xl`}
          >
            <div className="flex items-center justify-center">
              <h1
                className={`text-3xl ${
                  theme === "light" ? "text-black" : "text-gray-100"
                } mb-5`}
              >
                COLLEGE LIST
              </h1>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-red-500">No data to show</div>
            ) : (
              <CollegeList
                clgs={clgData}
                handleClgClick={handleClgClick}
                showClgList={showClgList}
              />
            )}
          </div>
        </div>

        <button
          className="fixed bottom-6 right-6 bg-gray-900 rounded-full p-3 text-white z-50 block lg:hidden opacity-80"
          onClick={toggleClgList}
        >
          {showClgList ? "Close" : "Show List"}
        </button>
      </div>

      <div className="flex w-full justify-center">
        <div
          className={`w-1/3 p-4 ${
            theme === "light" ? "bg-gray-400" : "bg-[#202226]"
          } h-screen overflow-y-scroll rounded-r-3xl hidden lg:block`}
        >
          <div className="flex items-center justify-center">
            <h1
              className={`text-3xl ${
                theme === "light" ? "text-black" : "text-gray-100"
              } mb-5`}
            >
              COLLEGE LIST
            </h1>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-500">No data to show</div>
          ) : (
            <CollegeList clgs={clgs} handleClgClick={handleClgClick} />
          )}
        </div>

        <div
          className={`w-2/3 p-4 ${
            theme === "light" ? "bg-white" : "bg-[#36393E]"
          }`}
        >
          <div className="flex items-center justify-center ">
            <h1
              className={`lg:text-3xl text-xl ${
                theme === "light" ? "text-black" : "text-gray-100"
              } mb-5 lg:font-normal font-bold`}
            >
              COLLEGE INFORMATION
            </h1>

            <button
              className={`fixed top-6 right-6 bg-gray-900 rounded-full p-3 text-white z-50 block opacity-80`}
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdSunny /> : <IoMdMoon />}
            </button>
            <div className="relative">
              <button
                className="fixed top-24 md:top-6 md:right-24 right-6 bg-gray-900 rounded-full p-3 text-white z-40 block opacity-80"
                onClick={handleUserClick}
              >
                <FaUser />
              </button>

              {showDropdown && (
                <div
                  className={`absolute lg:left-20 lg:right-0 right-1 top-5 w-56 mt-2 ${
                    theme === "light" ? "bg-gray-400" : "bg-[#202226]"
                  } rounded-3xl shadow-xl z-60`}
                >
                  <div className="p-4 text-white ">
                    {data ? (
                      <>
                        <p
                          className={`text-lg font-semibold ${
                            theme === "light"
                              ? "text-[#141414]"
                              : "text-gray-100"
                          }`}
                        >
                          {data.name}
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "light"
                              ? "text-[#141414]"
                              : "text-gray-400"
                          }`}
                        >
                          {data.email}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">Loading...</p>
                    )}
                  </div>
                  <hr />
                  <div className="p-2">
                    <p
                      className="block px-4 py-2 text-blue-600 rounded-lg cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Favourite Colleges
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={logout}
                      className="flex flex-row items-center justify-center gap-4 w-full px-4 py-2 text-red-600 text-left rounded-lg"
                    >
                      Logout
                      <FiLogOut />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CollegeInfo
            selectedClg={selectedClg}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite}
          />
        </div>
      </div>
      <FavoritesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        favorites={data ? data.favorites : []}
      />
    </div>
  );
}
