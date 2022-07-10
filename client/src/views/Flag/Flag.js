import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import NoLocation from "./NoLocation";
import NoImageLocation from "./NoImageLocation";
import NoImage from "./NoImage";

class Flag extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={6} xl={6}>
            <NoImage />
          </Col>

          <Col md={6} xl={6}>
            <NoLocation />
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12}>
            <NoImageLocation />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Flag;
