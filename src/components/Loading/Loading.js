import React from "react";
import { LoadingIcon } from "../../assets/icons";

const Loading = () => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div>
        <img
          src={LoadingIcon}
          style={{ width: 100, height: 100 }}
          alt="Loading"
        />
        <h6 className="text-center">Loading...</h6>
      </div>
    </div>
  );
};

export default Loading;
