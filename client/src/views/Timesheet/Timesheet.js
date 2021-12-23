import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { API_SERVER } from "../../config/constant";

import { Row, Col, Card } from "react-bootstrap";

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
      // {
      //   name: "Image",
      //   selector: "image",
      //   sortable: false,
      // },
      // {
      //   name: "Action",
      //   selector: "action",
      //   sortable: true,
      //   cell: (d) => (
      //     <div className="toggle-switch">
      //       <input
      //         type="checkbox"
      //         className="toggle-switch-checkbox"
      //         name="toggleSwitch"
      //         id="toggleSwitch"
      //       />
      //       <label className="toggle-switch-label" htmlFor="toggleSwitch">
      //         <span className="toggle-switch-inner"></span>
      //         <span className="toggle-switch-switch"></span>
      //       </label>
      //     </div>
      //   ),
      // },
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
