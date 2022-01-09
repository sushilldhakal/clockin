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
    startDate: getMonday,
    endDate: getSunday,
  };

  componentDidMount() {
    axios.get(API_SERVER + "employees").then((res) => {
      this.setState({
        users: res.data,
      });
    });
    this.reloadTimesheet = this.reloadTimesheet.bind(this);
  }

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
    const handleJumpToCurrentWeek = (currenDate) => {
      console.log(`current date: ${currenDate}`);
    };

    const handleWeekPick = (startDate, endDate) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const Value = startDate.split(" ");
      const Value1 = endDate.split(" ");
      const rStartDate = Number(Value[0]) + 1;
      const rEndDate = Number(Value1[0]) + 1;
      const month = months.indexOf(Value[1]) + 1;
      const month1 = months.indexOf(Value1[1]) + 1;
      const sDate = rStartDate + "-" + month + "-" + Value[2];
      const eDate = rEndDate + "-" + month1 + "-" + Value1[2];

      this.setState({
        startDate: sDate,
        endDate: eDate,
      });

      this.reloadTimesheet();
      setTimeout(this.reloadTimesheet, 100);
    };

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

    const userTimesheet = this.state.timesheets;

    console.log(userTimesheet);

    return (
      <div>
        <Row>
          <Col md={12} xl={12}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">{this.state.user}</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <Row className="container">
                  <Col md={6}>
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
                        {this.state.users.map((user, id) => (
                          <option key={id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Select Week</Form.Label>
                    <span className="pl-2 pr-2">{this.state.startDate}</span>To
                    <span className="pl-2">{this.state.endDate}</span>
                    <WeeklyCalendar
                      onWeekPick={handleWeekPick}
                      //jumpToCurrentWeekRequired={true}
                      //onJumpToCurrentWeek={handleJumpToCurrentWeek}
                    />
                  </Col>
                </Row>

                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={getTimesheet}
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
          </Col>
          {/* <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>3-1-2022 To 9-1-2022</Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Card.Header>
                    <span className="float-start">Total Hours</span>

                    <span className="float-end">40hrs</span>
                  </Card.Header>
                </Card>
                <Card>
                  <Card.Header>
                    <Card.Title>
                      <i className="far fa-calendar-alt"></i>
                      <span className="align-left">Mon, 3 Jan</span>
                    </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <Row>
                      <Col>
                        <i className="far fa-clock"></i>
                        8:00am - 4:30pm
                        <br />
                        <i className="fas fa-mug-hot"></i>
                        30min
                      </Col>
                      <Col>
                        <span className="float-end">
                          <i className="fas fa-hourglass-half"></i>
                          8hrs
                        </span>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
        </Row>
      </div>
    );
  }
}
export default Timesheet;
