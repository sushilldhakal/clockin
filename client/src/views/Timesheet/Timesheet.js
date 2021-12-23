import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

import { WeeklyCalendar } from "react-week-picker";
import "react-week-picker/src/lib/calendar.css";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { API_SERVER } from "../../config/constant";

import { Row, Col, Card, Form } from "react-bootstrap";

class Timesheet extends Component {
  state = {
    users: [],
    user: '',
    timesheets: [],
    startDate:'',
    endDate: ''
  };
  componentDidMount() {
    axios.get(API_SERVER + "employees").then((res) => {
      this.setState({
        users: res.data,
      });
    });
    this.reloadTimesheet = this.reloadTimesheet.bind(this);
  }

  reloadTimesheet = (user_id) => {
    if(this.state.user)
    axios.get(API_SERVER + "timesheets", {
      params: {
        user_id: user_id,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      },
    }).then((res) => {
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
      this.setState({
        startDate: startDate,
        endDate: endDate,
      })
      this.reloadTimesheet()
    };
    const columns = [
      {
        name: "date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Staff Image",
        selector: "image",
        sortable: false,
        cell: (d) => (
          <div className="image-popover">
            <a
              href={d.image}
              onclick="window.open(d.image);return false;"
              target="_blank"
            >
              <img
                src={d.image}
                className="img-circle rounded-circle"
                alt="user-image"
              />
              <img
                src={d.image}
                className="img-circle rounded-circle show-on-popover"
                alt="user-image"
                onClick={() => window.open(d.image, "_blank")}
              />
            </a>
          </div>
        ),
      },
      {
        name: "Name",
        selector: "name",
        sortable: false,
        cell: (d) => (
          <Link to={"/dashboard/each-staff/" + d.user._id}>{d.name}</Link>
        ),
      },
      {
        name: "Employee",
        selector: "hire",
        sortable: false,
      },
      {
        name: "Job Role",
        selector: "role",
        sortable: true,
      },
      {
        name: "Location",
        selector: "site",
        sortable: true,
      },
      {
        name: "Type",
        selector: "type",
        sortable: true,
      },
      {
        name: "Logged In time",
        selector: "time",
        sortable: true,
      },
    ];
    const getTimesheet = this.state.timesheets;
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
                <Card.Title as="h5">{this.state.title} {this.state.user}</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <Row className="container">
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select User</Form.Label>
                      <Form.Control as="select" onChange={e=>{
                        this.setState({
                          user: e.target.value
                        })
                        this.reloadTimesheet(e.target.value)
                      }}>
                        <option>Select User</option>
                        {this.state.users.map((user) => (
                          <option value={user._id}>{user.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Select Week</Form.Label>
                    <WeeklyCalendar
                      onWeekPick={handleWeekPick}
                      jumpToCurrentWeekRequired={true}
                      onJumpToCurrentWeek={handleJumpToCurrentWeek}
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
        </Row>
      </div>
    );
  }
}
export default Timesheet;
