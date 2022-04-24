import React, { useEffect, useState } from "react";
import { AddButton, FilterCard, Loading, PageHeader } from "../../components";
import { Container } from "react-bootstrap";
import axios from "axios";
import config from "../../config.json";

const Filters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  const fetchData = () => {
    setIsLoading(true);

    axios
      .get(`${config.service}/api/filter`)
      .then((data) => {
        setFilters(data.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteFilter = (id) => {
    let newFilters = [];

    for (let filter of filters) {
      if (filter.ID + "" !== id + "") {
        newFilters.push(filter);
      }
    }

    setFilters(newFilters);
  };

  return (
    <>
      <PageHeader title="Filters" link="/" />
      <Container style={{ marginBottom: 100 }}>
        {isLoading ? (
          <div className="mt-5">
            <Loading />
          </div>
        ) : (
          <>
            <div className="mt-3 bg-light">
              {filters.map((filter, index) => {
                return (
                  <FilterCard
                    key={index}
                    data={filter}
                    deleteFilter={deleteFilter}
                  />
                );
              })}
            </div>
          </>
        )}
      </Container>
      <div className="w-100 position-fixed" style={{ bottom: 25 }}>
        <Container>
          <AddButton text="Add filter" />
        </Container>
      </div>
    </>
  );
};

export default Filters;
