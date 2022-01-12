import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { WeeklyCalendar } from "react-week-picker";
import "react-week-picker/src/lib/calendar.css";

import moment from "moment";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { API_SERVER } from "../../config/constant";
import { Row, Col, Card, Form, Accordion } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import CsvDownload from "react-json-to-csv";

const today = new Date();
const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
const sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7));

const addOne = monday.getMonth() + 1;
const addOne1 = sunday.getMonth() + 1;
const getMonday = monday.getDate() + "-" + addOne + "-" + monday.getFullYear();
const getSunday = sunday.getDate() + "-" + addOne1 + "-" + sunday.getFullYear();

class Timesheet extends Component {
  state = {
    users: [],
    user: "",
    timesheets: [],
    timeLog: [],
    employer: [],
    categoryEmployer: [],
    startDate: getMonday,
    endDate: getSunday,
  };

  componentDidMount() {
    axios.get(API_SERVER + "employees").then((res) => {
      this.setState({
        users: res.data,
      });
    });
    axios.get(API_SERVER + "category/employer").then((res) => {
      this.setState({
        categoryEmployer: res.data,
      });
    });

    this.reloadTimesheet = this.reloadTimesheet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      startDate: e.target.value,
    });
    console.log("startDate" + this.state.startDate);
  };
  handleChangeEnd = (e) => {
    this.setState({
      endDate: e.target.value,
    });
    console.log("endDate" + this.state.endDate);
  };

  reloadTimesheet = () => {
    let obj = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    if (this.state.user) {
      obj.user_id = this.state.user;
    }

    axios
      .get(API_SERVER + "timesheets", {
        params: obj,
      })
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets.map((timesheet) => {
            return {
              ...timesheet,
              user: this.state.users.find((user) => user.pin === timesheet.pin),
            };
          }),
        });
      });
  };

  render() {
    const columns = [
      {
        name: "date",
        selector: (row) => row["date"],
        sortable: true,
      },
      {
        name: "Staff Image",
        selector: (row) => row["image"],
        sortable: false,
        cell: (d) => (
          <div className="image-popover">
            <img
              src={d.image}
              className="img-circle rounded-circle"
              alt="user"
            />
            <img
              src={d.image}
              className="img-circle rounded-circle show-on-popover"
              alt="user"
              onClick={() => window.open(d.image, "_blank")}
            />
          </div>
        ),
      },
      {
        name: "Name",
        selector: (row) => row["name"],
        sortable: false,
        cell: (d) => (
          <Link to={"/dashboard/each-staff/" + d.user._id}>{d.name}</Link>
        ),
      },
      {
        name: "Employee",
        selector: (row) => row["hire"],
        sortable: false,
      },
      {
        name: "Job Role",
        selector: (row) => row["role"],
        sortable: true,
      },
      {
        name: "Location",
        selector: (row) => row["site"],
        sortable: true,
      },
      {
        name: "Type",
        selector: (row) => row["type"],
        sortable: true,
      },
      {
        name: "Logged In time",
        selector: (row) => row["time"],
        sortable: true,
      },
    ];
    const getTimesheet = this.state.timesheets;
    const tableData = {
      columns,
      data: getTimesheet,
    };
    console.log(this.state.categoryEmployer);
    return (
      <div>
        <Row>
          <Col md={12} xl={12}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Timesheets</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <Row className="container">
                  <Col md={3} sm={6}>
                    <Form.Group as={Col} controlId="formGridHire">
                      <Form.Label>Select Employer</Form.Label>
                      <Form.Control
                        aria-label="Default select example"
                        as="select"
                        onChange={(e) => {
                          this.setState({
                            hire: e.target.value,
                          });
                        }}
                      >
                        <option>Select Employer</option>
                        {this.state.categoryEmployer.map((hire, id) => (
                          <option key={id} value={hire.name}>
                            {hire.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select User</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          this.setState({
                            user: e.target.value,
                          });
                          setTimeout(this.reloadTimesheet, 100);
                        }}
                      >
                        <option value="">Select User</option>
                        {this.state.users.filter(e=>{
                          return this.state.hire === e.hire
                        }).map((user, id) => (
                          <option key={id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Label>Range DD-MM-YYYY</Form.Label>
                    <input
                      id="formGridsDate"
                      type="text"
                      name="startDate"
                      data-date=""
                      data-date-format="DD MMMM YYYY"
                      className="form-control"
                      value={this.state.startDate}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                      placeholder="Start Date"
                    />
                    To
                    <input
                      id="formGrideDate"
                      type="text"
                      name="endDate"
                      data-date=""
                      data-date-format="DD MMMM YYYY"
                      className="form-control"
                      value={this.state.endDate}
                      onChange={(e) => {
                        this.handleChangeEnd(e);
                      }}
                      placeholder="End Date"
                    />
                  </Col>
                  <Col md={3} sm={6}>
                    <CsvDownload data={tableData.data}>Json to CSV</CsvDownload>
                    <br />
                    Total Hours: 40hrs
                  </Col>
                </Row>
                <DataTableExtensions
                  filter={false}
                  print={false}
                  exportHeaders={true}
                  {...tableData}
                >
                  <DataTable
                    columns={columns}
                    data={getTimesheet}
                    defaultSortField="id"
                    defaultSortAsc={true}
                    pagination
                    highlightOnHover
                    export={true}
                    sortIcon={<SortIcon />}
                  />
                </DataTableExtensions>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Timesheet;
