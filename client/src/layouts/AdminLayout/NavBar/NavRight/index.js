import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Dropdown, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { API_SERVER } from "../../../../config/constant";
import { LOGOUT } from "./../../../../store/actions";

const NavRight = () => {
  const account = useSelector((state) => state.account);
  const dispatcher = useDispatch();

  const [listOpen, setListOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(window.location.reload, 1000)
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
