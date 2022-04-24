import React, { useEffect, useState } from "react";
import { Loading, PageHeader } from "../../components";
import { Container, Button, FormGroup, FormLabel } from "react-bootstrap";

import Regions from "./components/Regions";
import Marks from "./components/Marks";
import axios from "axios";
import config from "../../config.json";
import { useHistory } from "react-router-dom";

const CreateFilter = (props) => {
  const id = props.match.params.id;

  const history = useHistory();

  const [region, setRegion] = useState({
    region: "",
    city: "",
  });
  const [isSelectRegion, setIsSelectRegion] = useState(false);
  const [mark, setMark] = useState({
    mark: "",
    model: "",
  });
  const [isSelectMark, setIsSelectMark] = useState(false);
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(0);
  const [yearStart, setYearStart] = useState(1960);
  const [yearEnd, setYearEnd] = useState(new Date().getFullYear());
  const [cleared, setCleared] = useState("");
  const [condition, setCondition] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [isLoading, setIsLoading] = useState(id ? true : false);

  const handleSave = () => {
    if (id) {
      axios
        .patch(`${config.service}/api/filter/${id}`, {
          region,
          mark,
          priceStart,
          priceEnd,
          yearStart,
          yearEnd,
          cleared,
          condition,
          gearbox,
          chatId: "827932852",
        })
        .then(() => {
          history.push("/filter");
          window.location.reload();
        });

      return;
    }

    axios
      .post(`${config.service}/api/filter`, {
        region,
        mark,
        priceStart,
        priceEnd,
        yearStart,
        yearEnd,
        cleared,
        condition,
        gearbox,
        chatId: "827932852",
      })
      .then(() => {
        history.push("/filter");
        window.location.reload();
      });
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);

      axios
        .get(`${config.service}/api/filter/${id}`)
        .then((data) => {
          data = data.data.data;

          console.log(data);
          setMark({
            mark: data.BRAND,
            model: data.MODEL,
          });
          setCondition(data.CONDITION);
          setGearbox(data.GEARBOX);
          setRegion({
            region: data.REGION,
            city: data.CITY,
          });
          setPriceStart(data.PRICE_START);
          setPriceEnd(data.PRICE_END);
          setYearStart(data.YEAR_START);
          setYearEnd(data.YEAR_END);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const getSelectRegionForm = () => {
    let regionName = "All regions";
    let isSelected = false;
    if (region.city) {
      regionName = region.city;
      isSelected = true;
    } else if (region.region) {
      regionName = region.region;
      isSelected = true;
    }

    return (
      <FormGroup>
        <FormLabel style={{ color: "gray" }}>Region</FormLabel>
        <div className="d-flex" style={{ cursor: "pointer" }}>
          <div
            className="w-100 px-3 py-1 border rounded"
            onClick={() => setIsSelectRegion(true)}
          >
            {regionName}
          </div>
          <span
            className={`${
              isSelected ? "text-danger" : ""
            } text-primary bottom-left px-3 py-1 border rounded`}
            onClick={() => setRegion({ region: "", city: "" })}
          >
            {isSelected ? "Reset" : "Select"}
          </span>
        </div>
      </FormGroup>
    );
  };

  const getSelectMarkForm = () => {
    return (
      <>
        <FormGroup className="mt-3">
          <FormLabel style={{ color: "gray" }}>Mark</FormLabel>
          <div className="d-flex" style={{ cursor: "pointer" }}>
            <div
              className="w-100 px-3 py-1 border rounded"
              onClick={() => setIsSelectMark(true)}
            >
              {mark.mark ? mark.mark : "All marks"}
            </div>
            <span
              className={`bottom-left px-3 py-1 border rounded ${
                mark.mark ? "text-danger" : "text-primary"
              }`}
              onClick={() => {
                if (mark.mark) {
                  setMark({
                    mark: "",
                    model: "",
                  });
                } else {
                  setIsSelectMark(true);
                }
              }}
            >
              {mark.mark ? "Reset" : "Select"}
            </span>
          </div>
        </FormGroup>
        {mark.model && (
          <FormGroup className="mt-3">
            <FormLabel style={{ color: "gray" }}>Model</FormLabel>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <div
                className="w-100 px-3 py-1 border rounded"
                onClick={() => setIsSelectMark(true)}
              >
                {mark.model}
              </div>
              <span
                className={`text-danger bottom-left px-3 py-1 border rounded`}
                onClick={() => setMark({ mark: mark.mark, model: "" })}
              >
                Reset
              </span>
            </div>
          </FormGroup>
        )}
      </>
    );
  };

  const getPriceForm = () => {
    return (
      <>
        <div className="w-100 text-secondary pt-3 pb-2">Цена</div>
        <div className="w-100 d-flex">
          <div className="w-50 pe-1">
            <div className="w-100 border border-gray-300 rounded d-flex flex-row overflow-hidden">
              <div className="px-2 pt-1 pb-1 text-secondary">от</div>
              <input
                value={priceStart}
                onChange={(e) => {
                  setPriceStart(parseInt(e.target.value));
                }}
                style={{ outline: "none", border: "none" }}
                type="number"
                className="d-block w-100 text-xs outline-none"
                max={999999999}
                min={0}
              />
            </div>
          </div>
          <div className="w-50 ps-1">
            <div className="w-100 border border-gray-300 rounded d-flex overflow-hidden">
              <div className="px-2 pt-1 pb-1 text-secondary">до</div>
              <input
                value={priceEnd}
                onChange={(e) => {
                  setPriceEnd(parseInt(e.target.value));
                }}
                style={{ outline: "none", border: "none" }}
                type="number"
                maxLength="11"
                className="d-block w-100 text-xs outline-none"
                max={999999999}
                min={0}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const getYearForm = () => {
    return (
      <>
        <div className="w-100 text-secondary pt-3 pb-2">Year</div>
        <div className="w-100 d-flex">
          <div className="w-50 pe-1">
            <div className="w-100 border border-gray-300 rounded d-flex flex-row overflow-hidden">
              <div className="px-2 pt-1 pb-1 text-secondary">from</div>
              <input
                value={yearStart}
                onChange={(e) => {
                  setYearStart(e.target.value);
                }}
                style={{ outline: "none", border: "none" }}
                type="number"
                max={new Date().getFullYear()}
                min={1960}
                className="d-block w-100 text-xs outline-none"
              />
            </div>
          </div>
          <div className="w-50 ps-1">
            <div className="w-100 border border-gray-300 rounded d-flex overflow-hidden">
              <div className="px-2 pt-1 pb-1 text-secondary">to</div>
              <input
                value={yearEnd}
                onChange={(e) => {
                  setYearEnd(e.target.value);
                }}
                style={{ outline: "none", border: "none" }}
                type="number"
                max={new Date().getFullYear()}
                min={1960}
                className="d-block w-100 text-xs outline-none"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const getClearedForm = () => {
    return (
      <>
        <div className="pt-3 pb-2 text-secondary">Cleared in Kazakhstan</div>
        <div className="d-flex">
          <div
            className={
              "border rounded px-2 py-1" +
              (cleared === "yes" ? " border-primary text-primary" : "")
            }
            onClick={() => setCleared("yes")}
          >
            Yes
          </div>
          <div
            className={
              "border rounded px-2 py-1 mx-2" +
              (cleared === "no" ? " border-primary text-primary" : "")
            }
            onClick={() => setCleared("no")}
          >
            No
          </div>
          <div
            className={
              "border rounded px-2 py-1" +
              (cleared === "" ? " border-primary text-primary" : "")
            }
            onClick={() => setCleared("")}
          >
            No matter
          </div>
        </div>
      </>
    );
  };

  const getConditionForm = () => {
    return (
      <>
        <div className="pt-3 pb-2 text-secondary">Condition</div>
        <div className="d-flex">
          <div
            className={
              "border rounded px-2 py-1" +
              (condition === "На ходу" ? " border-primary text-primary" : "")
            }
            onClick={() => setCondition("На ходу")}
          >
            On the go
          </div>
          <div
            className={
              "border rounded px-2 py-1 mx-2" +
              (condition === "Аварийная" ? " border-primary text-primary" : "")
            }
            onClick={() => setCondition("Аварийная")}
          >
            Emergency
          </div>
          <div
            className={
              "border rounded px-2 py-1" +
              (condition === "" ? " border-primary text-primary" : "")
            }
            onClick={() => setCondition("")}
          >
            No matter
          </div>
        </div>
      </>
    );
  };

  const getGearboxForm = () => {
    return (
      <>
        <div className="pt-3 pb-2 text-secondary">Gearbox</div>
        <div className="d-flex">
          <div
            className={
              "border rounded px-2 py-1" +
              (gearbox === "Механика" ? " border-primary text-primary" : "")
            }
            onClick={() => setGearbox("Механика")}
          >
            Mechanics
          </div>
          <div
            className={
              "border rounded px-2 py-1 mx-2" +
              (gearbox === "АКПП" ? " border-primary text-primary" : "")
            }
            onClick={() => setGearbox("АКПП")}
          >
            Automatic transmission
          </div>
          <div
            className={
              "border rounded px-2 py-1" +
              (gearbox === "" ? " border-primary text-primary" : "")
            }
            onClick={() => setGearbox("")}
          >
            No matter
          </div>
        </div>
      </>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="mt-5">
          <Loading />
        </div>
      );
    }

    if (isSelectRegion) {
      return (
        <Regions
          selectedRegion={region}
          setRegion={setRegion}
          handleClose={() => setIsSelectRegion(false)}
        />
      );
    }

    if (isSelectMark) {
      return (
        <Marks
          selectedMark={mark}
          setMark={setMark}
          handleClose={() => setIsSelectMark(false)}
        />
      );
    }

    return (
      <>
        <Container className="mt-3" style={{ marginBottom: 100 }}>
          <h6>Fill in the required fields</h6>
          <div className="shadow p-3 mt-3" style={{ fontSize: 14 }}>
            {getSelectRegionForm()}
            {getSelectMarkForm()}
            {getPriceForm()}
            {getYearForm()}
            {getClearedForm()}
            {getConditionForm()}
            {getGearboxForm()}
          </div>
        </Container>
        <div className="w-100 position-fixed" style={{ bottom: 25 }}>
          <Container className="w-100">
            <Button className="w-100" onClick={handleSave}>
              Save
            </Button>
          </Container>
        </div>
      </>
    );
  };

  return (
    <>
      <PageHeader title={`${id ? "Edit" : "Create"} filter`} link="/filter" />
      {renderBody()}
    </>
  );
};

export default CreateFilter;
