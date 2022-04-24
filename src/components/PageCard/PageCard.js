import React from "react";

const PageCard = ({ name, link, icon }) => {
  return (
    <div className="w-50 pe-1 mt-2" style={{ cursor: "pointer" }}>
      <a
        className="w-100 px-3 shadow d-flex page-link align-items-center"
        href={link}
      >
        <img src={icon} alt={name} />
        <span className="ms-2 text-dark">{name}</span>
      </a>
    </div>
  );
};

export default PageCard;
