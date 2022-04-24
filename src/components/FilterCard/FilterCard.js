import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { OptionsIcon } from "../../assets/icons";
import { currencyFormat } from "../../scripts/format";
import axios from "axios";
import config from "../../config.json";
import { useHistory } from "react-router-dom";

const FilterCard = (props) => {
  const data = props.data;
  const deleteFilter = props.deleteFilter;
  const [isShowOptions, setIsShowOptions] = useState(false);
  const history = useHistory();

  const getMarkName = () => {
    let text = "Any brand of car";

    if (data.BRAND) {
      text = data.BRAND;
    }
    if (data.MODEL) {
      text += " " + data.MODEL;
    }

    return text;
  };

  const getYears = () => {
    const startYear = props.data.YEAR_START || 1960;
    const endYear = props.data.YEAR_END || 2050;

    return startYear + " - " + endYear;
  };

  const getPriceRange = () => {
    const startPrice = props.data.PRICE_START || 0;
    const endPrice = props.data.PRICE_END || 999999999;

    return `${currencyFormat(startPrice)} ₸ - ${currencyFormat(endPrice)} ₸`;
  };

  const getRegionName = () => {
    let text = "All regions";

    if (props.data.CITY_NAME) {
      text =
        props.data.CITY_NAME[0].toUpperCase() +
        props.data.CITY_NAME.substring(1, props.data.CITY_NAME.length);
    } else if (props.data.REGION) {
      text = props.data.REGION;
    }

    return text;
  };

  const getGearbox = () => {
    let text = "No matter";

    if (props.data.GEARBOX) {
      if (props.data.GEARBOX === "АКПП") {
        text = "Automatic transmission";
      } else {
        text = "Mechanics";
      }
    }

    return text;
  };

  const getCondition = () => {
    let text = "No matter";

    if (props.data.CONDITION) {
      if (props.data.CONDITION === "На ходу") {
        text = "On the go";
      } else {
        text = "Emergency";
      }
    }

    return text;
  };

  const handleDelete = () => {
    const id = props.data.ID;

    axios.delete(`${config.service}/api/filter/${id}`).then((data) => {
      deleteFilter(data.data.id);
      setIsShowOptions(false);
    });
  };

  return (
    <>
      <div className="shadow p-3 bg-white mt-3 rounded">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="px-2 text-white rounded"
            style={{
              fontSize: 12,
              backgroundColor: data.IS_ACTIVE === 1 ? "green" : "brown",
            }}
          >
            {data.IS_ACTIVE === 1 ? "active" : "not active"}
          </div>
          <div style={{ cursor: "pointer" }}>
            <img
              src={OptionsIcon}
              style={{ width: 25 }}
              alt="Options"
              onClick={() => setIsShowOptions(true)}
            />
          </div>
        </div>
        <h6>{getMarkName()}</h6>
        <div style={{ color: "gray", fontSize: 13 }}>{getYears()}</div>
        <h6
          className="my-3"
          style={{ fontSize: 15, textDecoration: "underline" }}
        >
          {getPriceRange()}
        </h6>
        <div style={{ fontSize: "14px" }}>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: 200 }}>Region:</span>
            <span style={{ fontWeight: 400 }}>{getRegionName()}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: 200 }}>Gearbox:</span>
            <span style={{ fontWeight: 400 }}>{getGearbox()}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: 200 }}>Condition:</span>
            <span style={{ fontWeight: 400 }}>{getCondition()}</span>
          </div>
        </div>
      </div>
      {isShowOptions && (
        <>
          <div
            className="position-fixed w-100 bg-dark"
            style={{
              height: "100vh",
              top: 0,
              left: 0,
              zIndex: 1001,
              opacity: "0.5",
            }}
          ></div>
          <div
            className="w-100 position-fixed px-3 py-2 bg-white"
            style={{ bottom: 0, left: 0, zIndex: 1002, opacity: 1 }}
          >
            <div
              className="py-2 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/filter/" + props.data.ID);
                window.location.reload();
              }}
            >
              Edit
            </div>
            <div
              className="py-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete()}
            >
              Delete
            </div>
            <div className="mt-1 w-100">
              <Button
                className="w-100 mt-3"
                onClick={() => setIsShowOptions(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterCard;
