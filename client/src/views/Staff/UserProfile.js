import React, { Component } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

class UserProfile extends Component {
  state = {
    show: false,
    timesheets: [],
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "timesheets/" + this.props.match.params.staff_id)
      .then((res) => {
        this.setState({ timesheets: res.data.timesheets, user: res.data.user });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const timesheets = this.state.timesheets;

    const userDetails = this.state.user;
    console.log(userDetails);

    const columns = [
      {
        name: "Date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Clock In",
        selector: "in",
        sortable: false,
      },
      {
        name: "Break Start",
        selector: "break",
        sortable: true,
      },
      {
        name: "Break End",
        selector: "endBreak",
        sortable: true,
      },
      {
        name: "Clock Out",
        selector: "out",
        sortable: true,
      },
      {
        name: "Break hours",
        selector: "btotal",
        sortable: true,
      },
      {
        name: "Total hours",
        selector: "total",
        sortable: true,
      },
    ];

    const tableData = {
      columns,
      data: timesheets,
    };

    return (
      <div>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Edit Staff</Card.Title>
          </Card.Header>
          <Card.Body>
            <Button
              className="btn btn-primary toggle-button"
              onClick={this.handleShowForm}
            >
              {!this.state.show ? "Edit Employee Details" : "Close Form"}
            </Button>
            {this.state.show && (
              <form className="add-employee-form">
                <div className="container-add-employee">
                  <Col sm={12}>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <input
                          id="formGridName"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPin">
                        <Form.Label>PIN</Form.Label>
                        <input
                          id="formGridPin"
                          type="number"
                          name="pin"
                          className="form-control"
                          placeholder="Pin"
                          maxLength="4"
                          minLength="4"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridRole">
                        <Form.Label>Job Role</Form.Label>
                        <input
                          id="formGridRole"
                          type="text"
                          name="role"
                          className="form-control"
                          placeholder="Job Role"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridHire">
                        <Form.Label>Employer</Form.Label>
                        <input
                          id="formGridHire"
                          type="text"
                          name="hire"
                          className="form-control"
                          placeholder="Employer"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridSite">
                        <Form.Label>Job Location</Form.Label>
                        <input
                          id="formGridSite"
                          type="text"
                          name="site"
                          className="form-control"
                          placeholder="Job Location"
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <input
                          id="formGridEmail"
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <input
                          id="formGridPhone"
                          type="number"
                          name="phone"
                          className="form-control"
                          placeholder="Phone Number"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridDob">
                        <Form.Label>Date Of Birth</Form.Label>
                        <input
                          id="formGridDob"
                          type="date"
                          name="dob"
                          className="form-control"
                          placeholder="DOB"
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridDob">
                        <a className="btn btn-primary" href="#">
                          Save Employee Details
                        </a>
                      </Form.Group>
                    </Form.Row>
                  </Col>
                </div>
              </form>
            )}

            <DataTableExtensions {...tableData}>
              <DataTable
                columns={columns}
                data={timesheets}
                noHeader
                defaultSortField="id"
                defaultSortAsc={true}
                pagination
                highlightOnHover
                sortIcon={<SortIcon />}
              />
            </DataTableExtensions>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default UserProfile;
