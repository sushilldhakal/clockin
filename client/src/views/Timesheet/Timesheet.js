import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

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
          timesheets: res.data.map((timesheet) => {
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
    return (
      <div>
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
              <tr key={timesheet.user.id}>
                <td>{index + 1}</td>
                <td>{timesheet.user.name}</td>
                <td>{timesheet.date}</td>
                <td>{timesheet.time}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Timesheet;
