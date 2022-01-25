import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { API_SERVER } from "../../config/constant";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

const today = new Date();
const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
const sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7));

const getMonday = moment().startOf("isoWeek").format("YYYY-MM-DD");
const getSunday = moment()
  .startOf("isoWeek")
  .add(6, "days")
  .format("YYYY-MM-DD");

const displayTotal = 0;
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
    loading: false,
    displayTotal: "",
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
    this.reloadTimesheet();
  }

  handleChange = (e) => {
    this.setState({
      startDate: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };
  handleChangeEnd = (e) => {
    this.setState({
      endDate: moment(e.target.value).format("YYYY-MM-DD"),
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
    if (this.state.hire) {
      obj.hire = this.state.hire;
    }
    this.setState({ loading: true });
    axios
      .get(API_SERVER + "timesheets", { params: obj })
      .then((res) => {
        this.setState({
          loading: false,
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
  };
  render() {
    const map = new Map();
    this.state.timesheets.forEach((item) => map.set(item.pin, item));

    this.state.users.forEach((item) =>
      map.set(item.pin, { ...map.get(item.pin), ...item })
    );

    const mergedArr = Array.from(map.values());

    const headers = [
      { label: "Date", key: "date" },
      { label: "Name", key: "name" },
      { label: "Comment", key: "comment" },
      { label: "Employer", key: "hire" },
      { label: "Role", key: "role" },
      { label: "Location", key: "site" },
      { label: "Clock In", key: "in" },
      { label: "Break", key: "break" },
      { label: "End Break", key: "endBreak" },
      { label: "Clock Out", key: "out" },
      { label: "Total Break", key: "btotal" },
      { label: "Total Hour", key: "total" },
    ];

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
          <Link to={"/dashboard/each-staff/" + d._id}>
            {d.name}
            {!d.comment ? (
              <span></span>
            ) : (
              <div className="comment">
                <span>-{d.comment}</span>
              </div>
            )}
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
        cell: (row) => (
          <span className="align-left pl-2">
            {row.in === "Invalid date"
              ? ""
              : moment(row.in, "hh:mm a").format("LT")}
          </span>
        ),
      },
      {
        name: "Break In",
        selector: (row) => row["break"],
        sortable: true,
        cell: (row) => (
          <span className="align-left pl-2">
            {row.break === "Invalid date"
              ? ""
              : moment(row.break, "hh:mm a").format("LT")}
          </span>
        ),
      },
      {
        name: "Break Out",
        selector: (row) => row["endBreak"],
        sortable: true,
        cell: (row) => (
          <span className="align-left pl-2">
            {row.endBreak === "Invalid date"
              ? ""
              : moment(row.endBreak, "hh:mm a").format("LT")}
          </span>
        ),
      },
      {
        name: "Clock Out",
        selector: (row) => row["out"],
        sortable: true,
        cell: (row) => (
          <span className="align-left pl-2">
            {row.out === "Invalid date"
              ? ""
              : moment(row.out, "hh:mm a").format("LT")}
          </span>
        ),
      },
      {
        name: "Total break",
        selector: (row) => row["btotal"],
        sortable: true,
        cell: (row) => (
          <span>
            {console.log(row.btotal)}
            {row.endBreak == "a few seconds"
              ? ""
              : moment.duration(row.btotal, "hours").humanize()}
          </span>
        ),
      },
      {
        name: "Total",
        selector: (row) => row["total"],
        sortable: true,
        cell: (row) => (
          <span>
            {row.endBreak == "a few seconds"
              ? ""
              : moment.duration(row.total, "hours").humanize()}
          </span>
        ),
      },
    ];
    const getTimesheet = this.state.timesheets.map((e) => {
      e.id = e._id + e.date;
      return e;
    });

    const tableData = {
      columns,
      data: getTimesheet,
    };

    let sum = getTimesheet.reduce(function (prev, current) {
      return prev + +current.total;
    }, 0);

    let totalB = getTimesheet.reduce(function (prev, current) {
      return prev + +current.btotal;
    }, 0);

    totalB = totalB.toFixed(2);

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
                            timesheets: [],
                          });
                          setTimeout(this.reloadTimesheet, 100);
                        }}
                      >
                        <option value="">Select Employer</option>
                        {this.state.categoryEmployer.map((hire, id) => (
                          <option key={id} value={hire.name}>
                            {hire.name}
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
                      value={moment(this.state.startDate).format("YYYY-MM-DD")}
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
                      value={moment(this.state.endDate).format("YYYY-MM-DD")}
                      onChange={(e) => {
                        this.handleChangeEnd(e);
                        setTimeout(this.reloadTimesheet, 100);
                      }}
                      placeholder="End Date"
                    />
                  </Col>
                  <Col md={3} sm={6}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select User</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          this.setState({ user: e.target.value });
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
                    <CSVLink data={getTimesheet} headers={headers}>
                      <Button variant="success"> CSV File</Button> <br />
                    </CSVLink>
                    Total Working Hours: {sum || 0} hrs
                    <br />
                    Total break Hours: {totalB || 0} hrs
                    <br />
                    Total Hours: {sum - totalB || 0} hrs
                    <br />
                    <br />
                  </Col>
                </Row>
                <DataTableExtensions
                  print={false}
                  exportHeaders={false}
                  export={false}
                  filterPlaceholder="Search"
                  {...tableData}
                >
                  <DataTable
                    progressPending={this.state.loading}
                    columns={columns}
                    data={getTimesheet}
                    defaultSortField="id"
                    defaultSortAsc={true}
                    pagination
                    noHeader
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
