import React, { useContext } from "react";

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

import { ConfigContext } from "../../../contexts/ConfigContext";
import * as actionType from "../../../store/actions";

const NavBar = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu } = configContext.state;
  const { dispatch } = configContext;

  let headerClass = [
    "navbar",
    "pcoded-header",
    "navbar-expand-lg",
    "navbar-default",
  ];

  let toggleClass = ["mobile-menu"];
  if (collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  let collapseClass = ["collapse navbar-collapse"];

  let navBar = (
    <React.Fragment>
      <div className="m-header">
        <a
          href="https://aramexclockin.com"
          className={toggleClass.join(" ")}
          id="mobile-collapse"
          onClick={navToggleHandler}
        >
          <span />
        </a>
        <a to="#" className="b-brand">
          <span className="b-title">4th Dimension Transport</span>
        </a>
      </div>
      <div className={collapseClass.join(" ")}>
        <NavLeft />
        <NavRight />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header className={headerClass.join(" ")}>{navBar}</header>
    </React.Fragment>
  );
};

export default NavBar;
