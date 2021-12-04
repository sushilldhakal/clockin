import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { Dropdown } from "react-bootstrap";
import "./Dashboard.css";
import { faTrashAlt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

library.add(faTrashAlt, faUser, faLock);

class Timesheet extends Component {
  state = {
    users: [],
    timesheets: [],
  }
  componentDidMount() {
    axios.get('http://localhost:4000/api/employees').then(res => {
      this.setState({
        users: res.data
      })
      axios.get('http://localhost:4000/api/timesheets').then(res => {
        this.setState({
          timesheets: res.data.map(timesheet => {
            return {
              ...timesheet,
              user: this.state.users.find(user => user.pin === timesheet.pin)
            }
          })
        })
      })
    })


  }
  render() {

console.log(this.state.timesheets)
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

    return <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {this.state.timesheets.map((timesheet, index) => {
            return <tr key={timesheet.user.id}>
              <td>{index+1}</td>
              <td>{timesheet.user.name}</td>
              <td>{timesheet.date}</td>
              <td>{timesheet.time}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>;
  }
}
export default Timesheet;
