import React, { Component } from "react";

import Category from "./Role";

export default class Catageory extends Component {
  render() {
    return (
      <div className="catageory-body-page">
        <div className="dashboard-body">
          Category
          <Category type="Role" />
          <Category type="Employer" />
          <Category type="Location" />
        </div>
      </div>
    );
  }
}
