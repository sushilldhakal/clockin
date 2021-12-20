import React, { Component } from "react";
import List from "./List";
// import Form from '../Components/Form'
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
    edit: false,
  };

  // Get and Set value from form
  getFilterValue = (e) => {
    const search = e.target.value;
    const matches = search.match(/^[0-9\b]+$/);
    if (matches != null) {
      this.setState({ search });
    } else {
      this.setState({ search });
    }
  };

  componentDidMount() {
    this.retrieveData = this.retrieveData.bind(this);
    this.retrieveData();
  }

  retrieveData() {
    axios.get(API_SERVER + "employees").then((res) => {
      this.setState({ data: res.data });
    });
  }

  //Filter value from state
  getFilterData = () => {
    return this.state.data.filter(item => JSON.stringify(item).toLowerCase().indexOf(this.state.search) !== -1 );
  };

  //Get value from input fields
  getNewEmployee = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //Add value from state to data array
  addNewEmployee = (e) => {
    e.preventDefault();
    const { name, role, hire, site, email, phone, pin, dob } = this.state;

    if (!name || !role || !hire || !site || !phone || !email || !pin || !dob) {
      alert("Fill the fields");
    } else {
      const newEmployee = {
        id: this.state.id,
        name,
        role,
        hire,
        site,
        email,
        phone,
        pin,
        dob,
      };

      axios
        .post(API_SERVER + "add-employee", newEmployee)
        .then((res) => {
          alert(res.data.message);
          this.retrieveData();
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    }
  };

  editEmployee = (id) => {
    const editEmployee = this.state.data.find((item) => item.id === id);
    this.setState({
      data: editEmployee.name,
      show: true,
      name: editEmployee.name,
      role: editEmployee.role,
      hire: editEmployee.hire,
      site: editEmployee.site,
      email: editEmployee.email,
      phone: editEmployee.phone,
      pin: editEmployee.pin,
      dob: editEmployee.dob,
      edit: true,
      id: editEmployee.id,
    });
  };

  //Clear state from data array
  handleClearList = () => {
    this.setState({ search: "" });
  };

  //Show form
  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
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
                      ? "App-add-employee hide-employee-form"
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
                      getNewEmployee={this.getNewEmployee}
                      addNewEmployee={this.addNewEmployee}
                    />
                  )}
                </div>
                <List
                  key={this.state.id}
                  deleteEmployee={this.deleteEmployee}
                  editEmployee={this.editEmployee}
                  handleClearList={this.handleClearList}
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
