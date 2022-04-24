import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BackIcon } from "../../assets/icons";

const PageHeader = ({ title, link }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push(link);
    window.location.reload();
  };

  return (
    <div className="shadow py-3">
      <Container className="d-flex align-items-center">
        <div style={{ cursor: "pointer" }} onClick={handleBack}>
          <img src={BackIcon} alt={title} />
        </div>
        <h4 className="m-0 ms-3">{title}</h4>
      </Container>
    </div>
  );
};

export default PageHeader;
