import { Container } from "react-bootstrap";

const Header = () => {
  const logoLink =
    "https://joeysalumni.com/assets/default_user_company_logo-3058b28cca9e293f85b78add4842bc64.png";

  return (
    <div className="pt-3 pb-3 shadow">
      <Container className="d-flex align-items-center">
        <div>
          <img
            src={logoLink}
            alt={logoLink}
            style={{ width: 50, height: 64 }}
          />
        </div>
        <div className="ms-3">
          <div>
            <a href="/">
              <h6 className="m-0">Company name</h6>
            </a>
          </div>
          <div>
            <span className="text-secondary" style={{ fontSize: 14 }}>
              Latest auto ads
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
