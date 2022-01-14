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
import CsvDownload from "react-json-to-csv";

const today = new Date();
const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
const sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7));

const getMonday = moment().startOf('isoWeek').format('YYYY-MM-DD');
const getSunday = moment().startOf('isoWeek').add(6,'days').format('YYYY-MM-DD');

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
    this.reloadTimesheet()
  }

  handleChange = (e) => {
    this.setState({
      startDate: moment(e.target.value).format('YYYY-MM-DD'),
    });
  };
  handleChangeEnd = (e) => {
    this.setState({
      endDate: moment(e.target.value).format('YYYY-MM-DD'),
    });
  };

  reloadTimesheet = () => {
    let obj = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    if (this.state.user) {
      obj.user_id = this.state.user;
    }
    console.log(obj)
    axios
      .get(API_SERVER + "timesheets", {params: obj})
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets.map((timesheet) => {
            return {
              ...timesheet,
              user: res.data.user.find((user) => user.pin === timesheet.pin),
            };
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const map = new Map();
    this.state.timesheets.forEach((item) => map.set(item.pin, item));
    this.state.users.forEach((item) =>
      map.set(item.pin, { ...map.get(item.pin), ...item })
    );
    const mergedArr = Array.from(map.values());
  };

  render() {
    const map = new Map();
    this.state.timesheets.forEach((item) => map.set(item.pin, item));

    this.state.users.forEach((item) =>
      map.set(item.pin, { ...map.get(item.pin), ...item })
    );

    const mergedArr = Array.from(map.values());

    console.log(mergedArr);
    console.log(this.state.timesheets);

    const columns = [
      {
        id: "date",
        name: "date",
        selector: (row) => row["date"],
        sortable: true,
      },

      {
        id: "name",
        name: "Name",
        selector: (row) => row["name"],
        sortable: true,
        cell: (d) => (
          <Link to={"/dashboard/each-staff/" + d.id}>
            {d.name}
            {"-" + d.comment}
          </Link>
        ),
      },
      {
        id: "employee",
        name: "Employee",
        selector: (row) => row["hire"],
        sortable: true,
      },
      {
        id: "jobRole",
        name: "Job Role",
        selector: (row) => row["role"],
        sortable: true,
      },
      {
        id: "location",
        name: "Location",
        selector: (row) => row["site"],
        sortable: true,
      },
      {
        name: "Clock In",
        selector: (row) => row["in"],
        sortable: true,
      },
      {
        name: "Break In",
        selector: (row) => row["break"],
        sortable: true,
      },
      {
        name: "Break Out",
        selector: (row) => row["endBreak"],
        sortable: true,
      },
      {
        name: "Clock Out",
        selector: (row) => row["out"],
        sortable: true,
      },
      {
        name: "Total break",
        selector: (row) => row["btotal"],
        sortable: true,
      },
      {
        name: "Total",
        selector: (row) => row["total"],
        sortable: true,
      },
    ];
    const getTimesheet = this.state.timesheets.map(e=>{
      e.id = e.id + e.date;
      return e;
    });
    const tableData = {
      columns,
      data: getTimesheet,
    };

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
                            user: "",
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
                          this.setState({user: e.target.value});
                          setTimeout(this.reloadTimesheet, 100);
                        }}
                      >
                        <option value="">Select User</option>
                        {this.state.users
                          .filter((e) => {
                            return this.state.hire === e.hire;
                          })
                          .map((user, id) => (
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
                      type="date"
                      name="startDate"
                      data-date=""
                      data-date-format="DD MMMM YYYY"
                      className="form-control"
                      value={moment(this.state.startDate).format('YYYY-MM-DD')}
                      onChange={(e) => {
                        this.handleChange(e);
                        setTimeout(this.reloadTimesheet, 100);
                      }}
                      placeholder="Start Date"
                    />
                    To
                    <input
                      id="formGrideDate"
                      type="date"
                      name="endDate"
                      data-date=""
                      data-date-format="DD MMMM YYYY"
                      className="form-control"
                      value={moment(this.state.endDate).format('YYYY-MM-DD')}
                      onChange={(e) => {
                        this.handleChangeEnd(e);
                        setTimeout(this.reloadTimesheet, 100);
                      }}
                      placeholder="End Date"
                    />
                  </Col>
                  <Col md={3} sm={6}>
                    <CsvDownload data={tableData.data}>Json to CSV</CsvDownload>
                    <br />
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
