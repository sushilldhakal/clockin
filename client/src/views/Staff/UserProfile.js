import React, { Component } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import EditEmployee from "./EditEmployee";

class UserProfile extends Component {
  state = {
    show: false,
    timesheets: [],
    user: false,
    role: "",
    location: "",
    employer: "",
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "timesheets/" + this.props.match.params.staff_id)
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets,
          user: res.data.user[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_SERVER + "category/role")
      .then((res) => {
        this.setState({
          role: res.data.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleRemove(id, e) {
    axios
      .delete(API_SERVER + "employees/" + id)

      .then((res) => {
        console.log(res);
        console.log(res.data);

        const user = this.state.user.filter((item) => item.id !== id);
        this.setState({ user });
        alert("User Removed");
        window.location.href = "/dashboard/staff";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const timesheets = this.state.timesheets;
    const userDetails = this.state.user;
    const userName = userDetails[Object.keys(userDetails)[1]];
    const userId = userDetails[Object.keys(userDetails)[0]];
    const columns = [
      {
        name: "Date",
        selector: (row) => row["date"],
        sortable: true,
      },
      {
        name: "Clock In",
        selector: (row) => row["in"],
        sortable: false,
      },
      {
        name: "Break Start",
        selector: (row) => row["break"],
        sortable: true,
      },
      {
        name: "Break End",
        selector: (row) => row["endBreak"],
        sortable: true,
      },
      {
        name: "Clock Out",
        selector: (row) => row["out"],
        sortable: true,
      },
      {
        name: "Break hours",
        selector: (row) => row["btotal"],
        sortable: true,
      },
      {
        name: "Total hours",
        selector: (row) => row["total"],
        sortable: true,
      },
    ];

    const tableData = {
      columns,
      data: timesheets,
    };

    return (
      <div>
        <Card>
          <Card.Header>
            <Card.Title as="h5">{userName}</Card.Title>
            <div className="float-right">
              <button
                className="btn btn-danger btn-rounded"
                onClick={(e) => this.handleRemove(userId, e)}
              >
                Delete User
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            {this.state.user && (
              <Col>
                <Button
                  className="btn btn-primary toggle-button"
                  onClick={this.handleShowForm}
                >
                  {!this.state.show ? "Edit Employee Details" : "Close Form"}
                </Button>
              </Col>
            )}
            {this.state.user && this.state.show && (
              <EditEmployee
                user={this.state.user}
                role={this.state.role}
                location={this.state.location}
                employer={this.state.employer}
                onUpdate={(e) => this.setState({ show: false })}
              />
            )}

            <DataTableExtensions {...tableData}>
              <DataTable
                columns={columns}
                data={timesheets}
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
      </div>
    );
  }
}
export default UserProfile;
