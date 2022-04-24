import React, { useEffect, useState } from "react";
import { AccountInfo, Header, Loading } from "../../components";
import PageCard from "../../components/PageCard/PageCard";
import { Container } from "react-bootstrap";
import { FilterIcon, TariffIcon } from "../../assets/icons";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className="w-100 d-flex align-items-center"
          style={{ height: "100vh" }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Header />
          <AccountInfo />
          <Container className="d-flex flex-wrap w-100">
            {links.map((link, index) => {
              return (
                <PageCard
                  key={index}
                  name={link.name}
                  link={link.link}
                  icon={link.icon}
                />
              );
            })}
          </Container>
          <hr />
        </>
      )}
    </>
  );
};

export default Home;

const links = [
  {
    name: "Filters",
    link: "/filter",
    icon: FilterIcon,
  },
  {
    name: "Tariff",
    link: "/tariff",
    icon: TariffIcon,
  },
];
