import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { ArrowRightIcon, CheckIcon } from "../../../assets/icons";
import regions from "../../../constants/regions.json";

const Regions = ({ selectedRegion, setRegion, handleClose }) => {
  const [isShowCities, setIsShowCities] = useState(false);

  const updateRegion = ({ newRegion = "", newCity = "" }) => {
    setRegion({
      region: newRegion,
      city: newCity,
    });

    setIsShowCities(true);
  };

  return (
    <>
      <Container
        className="mt-3 p-3 rounded bg-white shadow"
        style={{ fontSize: 14, marginBottom: "100px" }}
      >
        <p className="mb-3" style={{ color: "gray" }}>
          List of regions
        </p>
        {regions.map((region, index) => {
          return (
            <div
              key={index}
              className={`w-100 ${
                index + 1 === regions.length ? "" : "border-bottom"
              } py-2 position-relative`}
              style={{ cursor: "pointer" }}
            >
              <div
                onClick={() => {
                  updateRegion({
                    newRegion: region.name,
                    newCity: "",
                  });

                  if (isShowCities) {
                    setIsShowCities(false);
                  }
                }}
              >
                {region.name}
                {selectedRegion.city === "" &&
                  selectedRegion.region === region.name && (
                    <span className="position-absolute" style={{ right: 0 }}>
                      <img src={CheckIcon} alt={region.name} />
                    </span>
                  )}
                {selectedRegion.region !== region.name && !isShowCities && (
                  <span className="position-absolute" style={{ right: 0 }}>
                    <img
                      src={ArrowRightIcon}
                      style={{ opacity: "0.5" }}
                      alt={region.name}
                    />
                  </span>
                )}
                {selectedRegion.region !== region.name && isShowCities && (
                  <span className="position-absolute" style={{ right: 0 }}>
                    <img
                      src={ArrowRightIcon}
                      style={{ opacity: "0.5" }}
                      alt={region.name}
                    />
                  </span>
                )}
              </div>
              {isShowCities && selectedRegion.region === region.name && (
                <div>
                  {region.cities.map((city, index) => {
                    return (
                      <div
                        className="w-100 my-2 ms-3"
                        key={index}
                        onClick={() =>
                          updateRegion({
                            newRegion: region.name,
                            newCity: city.city,
                          })
                        }
                      >
                        <div className="py-2">{city.name}</div>
                        {selectedRegion.city === city.city && (
                          <span
                            className="position-absolute"
                            style={{ right: 0 }}
                          >
                            <img src={CheckIcon} alt={city.name} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Container>
      <div className="w-100 position-fixed" style={{ bottom: 25 }}>
        <Container className="w-100">
          <Button className="w-100" onClick={() => handleClose()}>
            Done
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Regions;
