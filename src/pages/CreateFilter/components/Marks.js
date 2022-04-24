import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import brands from "../../../constants/brands.json";
import { CheckIcon } from "../../../assets/icons";
import Models from "./Models";

const Marks = ({ selectedMark, setMark, handleClose }) => {
  const popularMarks = brands.filter((v) => v.popular === true);
  const [isOpenModels, setIsOpenModels] = useState();
  const [models, setModels] = useState([]);

  const handleCloseModels = () => {
    setIsOpenModels(false);
    handleClose();
  };

  if (isOpenModels) {
    return (
      <Models
        handleClose={handleCloseModels}
        selectedMark={selectedMark}
        models={models}
        setMark={setMark}
      />
    );
  }

  return (
    <>
      <div className="w-100 px-5 pb-5 mb-5" style={{ fontSize: "0.875rem" }}>
        <div className="w-100 text-start py-3 fw-bold">
          Select the desired brand of car
        </div>
        <div
          className="w-100 bg-white rounded px-3 py-2 shadow position-relative"
          onClick={() =>
            setMark({
              mark: "",
              model: "",
            })
          }
        >
          All marks
          {selectedMark.mark === "" && (
            <span className="position-absolute" style={{ right: 10 }}>
              <img src={CheckIcon} alt="all" />
            </span>
          )}
        </div>
        <div className="w-100 mt-3 px-3 py-3 rounded shadow bg-white">
          <div className="text-secondary">Popular car brands</div>
          {popularMarks.map((popular, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setModels(popular.model);

                  setMark({
                    mark: popular.name,
                    model: "",
                  });
                }}
                className={`w-100 py-2 position-relative ${
                  index + 1 === popularMarks.length ? "" : "border-bottom"
                }`}
              >
                {popular.name}
                {selectedMark.mark === popular.name && (
                  <span className="position-absolute" style={{ right: 10 }}>
                    <img src={CheckIcon} alt="all" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="w-100 mt-3 px-3 py-3 rounded shadow bg-white">
          <div className="text-secondary">List of car brands</div>
          {brands.map((brand, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setModels(brand.model);

                  setMark({
                    mark: brand.name,
                    model: "",
                  });
                }}
                className={`w-100 py-2 position-relative ${
                  index + 1 === brands.length ? "" : "border-bottom"
                }`}
              >
                {brand.name}
                {selectedMark.mark === brand.name && (
                  <span className="position-absolute" style={{ right: 10 }}>
                    <img src={CheckIcon} alt="all" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-100 position-fixed" style={{ bottom: 25 }}>
        <Container className="w-100">
          <Button
            className="w-100"
            onClick={() => {
              if (selectedMark.mark === "" && selectedMark.model === "") {
                handleClose();
                return;
              }

              setIsOpenModels(true);
            }}
          >
            Done
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Marks;
