import React, { Component } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { faTrashAlt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { CSVLink } from "react-csv";

library.add(faTrashAlt, faUser, faLock);

const ExpandableComponent = ({ timesheet }) => {
  console.log(timesheet);
  return (
    <table className="inner-table">
      <thead>
        <tr>
          <th></th>
          <th>Image </th>
          <th>Image </th>
          <th>Image</th>
          <th>Image</th>
        </tr>
      </thead>
    </table>
  );
};

class UserProfile extends Component {
  state = {
    show: false,
  };
  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const timesheets = [
      {
        date: "2th Jan 2021",
        in: "8:10am",
        bStart: "12:40pm",
        bEnd: "01:30pm",
        out: "5:00pm",
        hours: "8hrs",
        action: "no",
      },
      {
        date: "1th Jan 2021",
        in: "8:10am",
        bStart: "12:40pm",
        bEnd: "01:30pm",
        out: "5:00pm",
        hours: "8hrs",
        action: "no",
      },
      {
        date: "22th Jan 2021",
        in: "8:10am",
        bStart: "12:40pm",
        bEnd: "01:30pm",
        out: "5:00pm",
        hours: "8hrs",
        action: "no",
      },
      {
        date: "16th Jan 2021",
        in: "8:10am",
        bStart: "12:40pm",
        bEnd: "01:30pm",
        out: "5:00pm",
        hours: "8hrs",
        action: "no",
      },
      {
        date: "19th Jan 2021",
        in: "8:10am",
        bStart: "12:40pm",
        bEnd: "01:30pm",
        out: "5:00pm",
        hours: "8hrs",
        action: "no",
      },
    ];
    const columns = [
      {
        name: "date",
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
        selector: "bStart",
        sortable: true,
      },
      {
        name: "Break End",
        selector: "bEnd",
        sortable: true,
      },
      {
        name: "Clock Out",
        selector: "out",
        sortable: true,
      },
      {
        name: "Total Working hours",
        selector: "hours",
        sortable: true,
      },
      {
        name: "Action",
        selector: "action",
        sortable: true,
        cell: (d) => (
          <div className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-switch-checkbox"
              name="toggleSwitch"
              id="toggleSwitch"
            />
            <label className="toggle-switch-label" htmlFor="toggleSwitch">
              <span className="toggle-switch-inner"></span>
              <span className="toggle-switch-switch"></span>
            </label>
          </div>
        ),
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
                expandableRows
                expandableRowsComponent={ExpandableComponent}
              />
            </DataTableExtensions>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default UserProfile;
