import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ThreeDots color="#5765F2" height={80} width={80} />
    </div>
  );
};

export default Loader;
