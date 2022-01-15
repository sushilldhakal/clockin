import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

import FlagLocation from "./Location";
import ImageLocation from "./ImageLocation";
import Image from "./Image";

class Flag extends Component {
  state = {
    users: [],
    user: "",
    timesheets: [],
    timeLog: [],
    employer: [],
    categoryEmployer: [],
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={6} xl={6}>
            <Image />
          </Col>
          <Col md={6} xl={6}>
            <FlagLocation />
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={6}>
            <ImageLocation />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Flag;
