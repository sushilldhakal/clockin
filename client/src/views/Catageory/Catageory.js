import React, { Component } from "react";

import Role from "./Role";
import Employee from "./Employee";
import Location from "./Location";

export default class Catageory extends Component {
  render() {
    return (
      <div className="catageory-body-page">
        <div className="dashboard-body">
          Category
          <Role />
          <Employee />
          <Location />
        </div>
      </div>
    );
  }
}
