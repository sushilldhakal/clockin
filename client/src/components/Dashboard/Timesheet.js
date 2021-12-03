import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { Dropdown } from "react-bootstrap";
import "./Dashboard.css";
import { faTrashAlt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrashAlt, faUser, faLock);

class Timesheet extends Component {
  render() {
    const data = [
      {
        id: 1,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "38hrs"
      },
      {
        id: 2,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "39hrs"
      },
      {
        id: 3,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "45hrs"
      },
      {
        id: 4,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "27hrs"
      },
      {
        id: 1,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "38hrs"
      },
      {
        id: 2,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "39hrs"
      },
      {
        id: 3,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "45hrs"
      },
      {
        id: 4,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "27hrs"
      },
      {
        id: 1,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "38hrs"
      },
      {
        id: 2,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "39hrs"
      },
      {
        id: 3,
        name: "Johnson Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "45hrs"
      },
      {
        id: 4,
        name: "John Ann",
        date: "29 Nov — 5 Dec 2021",
        hours: "27hrs"
      }
    ];

    const columns = [
      {
        Header: "Id",
        accessor: "id" // String-based value accessors!
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props) => (
          <span className="name-id">
            <a href="/userprofile">{props.value}</a>
          </span>
        )
        // String-based value accessors!
      },
      {
        Header: "Date",
        accessor: "date" // String-based value accessors!
      },
      {
        Header: "Hours",
        accessor: "hours" // String-based value accessors!
      }
    ];

    return (
      <div className="dashbaord-page">
        <div className="sorting-wrapper">
          <div className="col-sm-2">
            <input type="text" label="search" palceholder="search" />
          </div>
          <div className="col-sm-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                All Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Pending</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Approved</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-sm-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                All Location
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Port Mel</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Dandenong</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-sm-2">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                All Teams
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Role 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Role 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-sm-4">
            <p>Calender</p>
          </div>
        </div>

        <ReactTable
          data={data}
          columns={columns}
          minRows={0}
          className="-striped -highlight"
          defaultPageSize={10}
          showPagination={true}
          getTdProps={(state, rowInfo, col, instance) => {
            return {
              onClick: (e) => {
                if (col.Header === undefined) {
                  const { expanded } = state;
                  const path = rowInfo.nestingPath[0];
                  const diff = { [path]: expanded[path] ? false : true };
                  instance.setState({
                    expanded: {
                      ...expanded,
                      ...diff
                    }
                  });
                } else {
                  alert(
                    `Hello ${rowInfo.original.firstName} ${rowInfo.original.lastName}`
                  );
                }
              }
            };
          }}
          SubComponent={(row) => {
            return (
              <div style={{ padding: "20px" }}>
                <em>You can put any component you want here.</em>
                <br />
                <br />
                <div style={{ color: "blue" }}>
                  Name: {row.original.firstName} {row.original.lastName}
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default Timesheet;
