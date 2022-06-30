import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const laoadingState = useSelector((state) => state.loading.value);

  return (
    <>
      {laoadingState && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
