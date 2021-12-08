import React, { Component } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrashAlt, faUser, faLock);

class UserProfile extends Component {
  render() {
    return <div className="dashbaord-page"></div>;
  }
}
export default UserProfile;
