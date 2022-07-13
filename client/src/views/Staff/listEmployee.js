import React, { Component } from "react";
import List from "./List";
import { AddEmployee } from "./AddEmployee";
import uuidv1 from "uuid";
import { API_SERVER } from "../../config/constant";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

class ListEmployee extends Component {
  state = {
    data: [],
    id: uuidv1(),
    search: "",
    value: "",
    title: "Employee Search Filter",
    show: false,
    name: "",
    role: "",
    hire: "",
    site: "",
    pin: "",
    dob: "",
    comment: "",
    flag: false,
    categoryRole: [],
    categoryLocation: [],
    categoryEmployer: [],
    edit: false,
  };

  componentDidMount() {
    this.retrieveData = this.retrieveData.bind(this);
    this.retrieveRole = this.retrieveRole.bind(this);
    this.retrieveLocation = this.retrieveLocation.bind(this);
    this.retrieveEmployer = this.retrieveEmployer.bind(this);
    this.retrieveData();
    this.retrieveRole();
    this.retrieveLocation();
    this.retrieveEmployer();
  }

  retrieveData() {
    axios
      .get(API_SERVER + "employees", {
        headers: {
          api_key: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  retrieveRole() {
    axios.get(API_SERVER + "category/role").then((res) => {
      this.setState({ categoryRole: res.data });
    });
  }
  retrieveLocation() {
    axios.get(API_SERVER + "category/location").then((res) => {
      this.setState({ categoryLocation: res.data });
    });
  }
  retrieveEmployer() {
    axios.get(API_SERVER + "category/employer").then((res) => {
      this.setState({ categoryEmployer: res.data });
    });
  }

  //Filter value from state
  getFilterData = () => {
    return this.state.data.filter(
      (item) =>
        JSON.stringify(item).toLowerCase().indexOf(this.state.search) !== -1
    );
  };

  //Show form
  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const getRole = this.state.categoryRole;
    const getLocation = this.state.categoryLocation;
    const getEmployer = this.state.categoryEmployer;
    return (
      <React.Fragment>
        <Row>
          <Col md={12} xl={12}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">{this.state.title}</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <div
                  className={
                    !this.state.show
                      ? "App-add-employee hide-employee-form col-sm-12"
                      : "App-add-employee show-employee-form"
                  }
                >
                  <Button
                    className="btn btn-primary toggle-button"
                    onClick={this.handleShowForm}
                  >
                    {!this.state.show ? "Add New Employee" : "Close Form"}
                  </Button>

                  <br />
                  {this.state.show && (
                    <AddEmployee
                      name={this.state.name}
                      role={this.state.role}
                      hire={this.state.hire}
                      site={this.state.site}
                      email={this.state.email}
                      phone={this.state.phone}
                      pin={this.state.pin}
                      dob={this.state.dob}
                      edit={this.state.edit}
                      comment={this.state.comment}
                      addNewEmployee={this.addNewEmployee}
                      retrieveRole={getRole}
                      retrieveLocation={getLocation}
                      retrieveEmployer={getEmployer}
                    />
                  )}
                </div>
                <List
                  key={this.state.id}
                  deleteEmployee={this.deleteEmployee}
                  getFilterData={this.getFilterData}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ListEmployee;
