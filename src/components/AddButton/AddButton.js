import React from "react";

const AddButton = ({ text }) => {
  return (
    <a href="/filter/new">
      <div className="bg-white">
        <div
          className="btn-outline-success border border-success rounded w-100 text-center py-2"
          style={{ cursor: "pointer" }}
        >
          {text}
        </div>
      </div>
    </a>
  );
};

export default AddButton;
