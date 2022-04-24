import React from "react";
import { Button, Container } from "react-bootstrap";
import { CheckIcon } from "../../../assets/icons";

const Models = ({ selectedMark, setMark, handleClose, models }) => {
  return (
    <>
      <div className="w-100 px-5 pb-5 mb-5" style={{ fontSize: "0.875rem" }}>
        <div className="w-100 text-start py-3 fw-bold">
          Select the desired car model
        </div>
        <div
          className="rounded shadow px-3 py-2 position-relative"
          onClick={() =>
            setMark({
              mark: selectedMark.mark,
              model: "",
            })
          }
        >
          All models
          {selectedMark.model === "" && (
            <span className="position-absolute" style={{ right: 10 }}>
              <img src={CheckIcon} alt="all" />
            </span>
          )}
        </div>
        <div className="px-3 py-3 rounded shadow mt-3">
          <div className="text-secondary">List of car models</div>
          {models.map((model, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setMark({
                    mark: selectedMark.mark,
                    model: model.name,
                  })
                }
                className={`w-100 py-2 position-relative ${
                  index + 1 === models.length ? "" : "border-bottom"
                }`}
              >
                {model.name}
                {selectedMark.model === model.name && (
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
              handleClose();
            }}
          >
            Done
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Models;
