import React, { Component } from "react";

import { Col, Row } from "react-bootstrap";

import Category from "./Role";

export default class Catageory extends Component {
  render() {
    return (
      <div className="catageory-body-page">
        <div className="dashboard-body">
          <Row>
            <Col md="4">
              <Category type="Role" />
            </Col>
            <Col md="4">
              <Category type="Employer" />
            </Col>
            <Col md="4">
              <Category type="Location" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
