import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { API_SERVER } from "../../config/constant";
import { CSVLink } from "react-csv";

import { Row, Col, Card } from "react-bootstrap";

const ExpandableComponent = ({ timesheet }) => {
  console.log(timesheet);
  return (
    <table className="inner-table">
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Clock In </th>
          <th>Break time </th>
          <th>Clock Out</th>
          <th>Total work hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>2nd Jan 2021</td>
          <td>8:00am</td>
          <td>30min</td>
          <td>5:00pm</td>
          <td>8.5hrs</td>
        </tr>
        <tr>
          <td></td>
          <td>3 Jan 2021</td>
          <td>8:00am</td>
          <td>30min</td>
          <td>5:00pm</td>
          <td>8.5hrs</td>
        </tr>
        <tr>
          <td></td>
          <td>4 Jan 2021</td>
          <td>8:00am</td>
          <td>30min</td>
          <td>5:00pm</td>
          <td>8.5hrs</td>
        </tr>
        <tr>
          <td></td>
          <td>5 Jan 2021</td>
          <td>8:00am</td>
          <td>30min</td>
          <td>5:00pm</td>
          <td>8.5hrs</td>
        </tr>
        <tr>
          <td></td>
          <td>6 Jan 2021</td>
          <td>8:00am</td>
          <td>30min</td>
          <td>5:00pm</td>
          <td>8.5hrs</td>
        </tr>
      </tbody>
    </table>
  );
};

class Timesheet extends Component {
  state = {
    users: [],
    timesheets: [],
  };
  componentDidMount() {
    axios.get(API_SERVER + "employees").then((res) => {
      this.setState({
        users: res.data,
      });
      axios.get(API_SERVER + "timesheets").then((res) => {
        this.setState({
          timesheets: res.data.timesheets.map((timesheet) => {
            return {
              ...timesheet,
              user: this.state.users.find((user) => user.pin === timesheet.pin),
            };
          }),
        });
      });
    });
  }

  render() {
    // const timesheets = [
    //   {
    //     date: "2th-9th Jan 2021",
    //     name: "Sushil Dhakal",
    //     hire: "NOVA",
    //     role: "Bay Supervisor",
    //     site: "Port Melbourne",
    //     hours: "40.5hrs",
    //     action: "no",
    //   },
    //   {
    //     date: "2th-9th Jan 2021",
    //     name: "Sushil Dhakal",
    //     hire: "NOVA",
    //     role: "Bay Supervisor",
    //     site: "Port Melbourne",
    //     hours: "40.5hrs",
    //     action: "no",
    //   },
    //   {
    //     date: "2th-9th Jan 2021",
    //     name: "Sushil Dhakal",
    //     hire: "NOVA",
    //     role: "Bay Supervisor",
    //     site: "Port Melbourne",
    //     hours: "40.5hrs",
    //     action: "no",
    //   },
    //   {
    //     date: "2th-9th Jan 2021",
    //     name: "Sushil Dhakal",
    //     hire: "NOVA",
    //     role: "Bay Supervisor",
    //     site: "Port Melbourne",
    //     hours: "40.5hrs",
    //     action: "no",
    //   },
    //   {
    //     date: "2th-9th Jan 2021",
    //     name: "Sushil Dhakal",
    //     hire: "NOVA",
    //     role: "Bay Supervisor",
    //     site: "Port Melbourne",
    //     hours: "40.5hrs",
    //     action: "no",
    //   },
    // ];
    const columns = [
      {
        name: "date",
        selector: "date",
        sortable: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: false,
        cell: (d) => (
          <Link to={"/dashboard/each-staff/" + d.user.id}>{d.name}</Link>
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
    const getTimesheet = this.state.timesheets;
    const tableData = {
      columns,
      data: getTimesheet,
    };

    console.log(this.state.timesheets);
    return (
      <div>
        <Row>
          <Col md={12} xl={12}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">{this.state.title}</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
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
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
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
