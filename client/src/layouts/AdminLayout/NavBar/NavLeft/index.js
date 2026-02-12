import React from "react";
import { ListGroup } from "react-bootstrap";

import useWindowSize from "../../../../hooks/useWindowSize";
import NavSearch from "./NavSearch";

const NavLeft = () => {
  const windowSize = useWindowSize();

  //let dropdownRightAlign = false;

  let navItemClass = ["nav-item"];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, "d-none"];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">
          <NavSearch windowWidth={windowSize.width} />
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
