import React, { Component } from "react";

import ListEmployee from "./listEmployee";

import "./Staff";

export default class Staff extends Component {
  render() {
    return (
      <div className="staff">
        <div className="dashboard-body">
          <ListEmployee id="employee-list" />
        </div>
      </div>
    );
  }
}
