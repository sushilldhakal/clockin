import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavRight = () => {

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <React.Fragment>
      <ListGroup
        as="ul"
        bsPrefix=" "
        className="navbar-nav ml-auto"
        id="navbar-right"
      >
        <ListGroup.Item as="li" bsPrefix=" ">
          <Link to="/login" className="dropdown-item" onClick={handleLogout}>
            <i className="feather icon-log-out" /> Logout
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
