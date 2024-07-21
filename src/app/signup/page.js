"use client";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import Loader from "@/components/Loader";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className={`w-full h-screen ${
        theme === "light" ? "bg-white" : "bg-[#36393E]"
      } flex items-center justify-center font-abc`}
    >
      <button
        className={`fixed top-6 right-6 bg-gray-900 rounded-full p-3 text-white z-50 block  opacity-80`}
        onClick={toggleTheme}
      >
        {theme === "light" ? <MdSunny /> : <IoMdMoon />}
      </button>

      <div
        className={`max-w-[400px] w-[60%] p-8 rounded-3xl shadow-lg ${
          theme === "light" ? "bg-gray-400" : "bg-[#202226]"
        }`}
      >
        <h2
          className={`text-center text-2xl mb-4 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
              htmlFor="username"
            >
              Name
            </label>
            <input
              className={`w-full p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
              type="text"
              id="username"
              name="username"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
              htmlFor="username"
            >
              Email
            </label>
            <input
              className={`w-full p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
              type="text"
              id="username"
              name="username"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`w-full p-2 rounded ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="mb-4 mt-5">
            {loading ? (
              <Loader />
            ) : (
              <button
                className={`w-full py-2 rounded  ${
                  theme === "light" ? "bg-[#4B5563]" : "bg-[#5765F2]"
                } ${theme === "light" ? "text-[#fff]" : "text-[#fff]"} `}
                type="submit"
                onClick={onSignup}
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
        <div className="text-center">
          <p
            className={`text-sm ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Already have an account?{" "}
            <Link
              className={`text-sm ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
              href="/login"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
