import React, { Component } from "react";
import { Card, Col, Form, Button, Accordion, Row } from "react-bootstrap";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../config/constant";
import EditEmployee from "./EditEmployee";

import moment from "moment";

const ExpandableComponent = ({ data }) => {
  return (
    <table className="inner-table">
      <thead>
        <tr>
          <th></th>
          <th>
            <div className="image-popover">
              <img src={data.imagein} className="img-circle rounded-circle" />
              <img
                src={data.imagein}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <img
                src={data.imagebreak}
                className="img-circle rounded-circle"
              />
              <img
                src={data.imagebreak}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <img
                src={data.imageendBreak}
                className="img-circle rounded-circle"
              />
              <img
                src={data.imageendBreak}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <img src={data.imageout} className="img-circle rounded-circle" />
              <img
                src={data.imageout}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <a
              href={"https://www.google.com/maps/place/" + data.wherein}
              target="_blank"
            >
              Check Location
            </a>
          </td>
          <td>
            <a
              href={"https://www.google.com/maps/place/" + data.wherebreak}
              target="_blank"
            >
              Check Location
            </a>
          </td>
          <td>
            <a
              href={"https://www.google.com/maps/place/" + data.whereendBreak}
              target="_blank"
            >
              Check Location
            </a>
          </td>
          <td>
            <a
              href={"https://www.google.com/maps/place/" + data.whereout}
              target="_blank"
            >
              Check Location
            </a>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

class UserProfile extends Component {
  state = {
    show: false,
    timesheets: [],
    user: false,
    role: "",
    location: "",
    employer: "",
    comment: "",
    inputValue: "",
    in: "",
    break: "",
    breakOut: "",
    out: "",
    selected_row_index: 0,
    is_action_menu_active: false,
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "timesheets/" + this.props.match.params.staff_id)
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets,
          user: res.data.user[0],
        });
        //console.log(res.data.timesheets);
      })
      .catch((err) => {
        console.log(err);
      });

    this.retrieveRole = this.retrieveRole.bind(this);
    this.retrieveLocation = this.retrieveLocation.bind(this);
    this.retrieveEmployer = this.retrieveEmployer.bind(this);
    this.retrieveRole();
    this.retrieveLocation();
    this.retrieveEmployer();
  }

  retrieveRole() {
    axios.get(API_SERVER + "category/role").then((res) => {
      this.setState({ categoryRole: res.data });
    });
  }
  retrieveLocation() {
    axios.get(API_SERVER + "category/location").then((res) => {
      this.setState({ categoryLocation: res.data });
    });
  }
  retrieveEmployer() {
    axios.get(API_SERVER + "category/employer").then((res) => {
      this.setState({ categoryEmployer: res.data });
    });
  }

  // handleButtonClick = (row, index) => {
  //   this.setState({
  //     edit: !this.state.edit,
  //   });

  //   console.log(row);
  //   console.log(index);
  // };
  open_setting_menu(row, index) {
    this.setState({
      is_action_menu_active: !this.state.is_action_menu_active,
      selected_row_index: index,
    });

    console.log(index);
    console.log(row);
  }

  handleTableInput = (e) => {
    let input = e.target;
    let name = input.name;
    let value = input.value;
    this.setState({
      [name]: value,
    });
    console.log(name, value);
  };

  handleShowForm = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleRemove(id, e) {
    axios
      .delete(API_SERVER + "employees/" + id)

      .then((res) => {
        console.log(res.data);
        swal({
          title: "User Deleted",
          text: "User Deleted Sucessfull, please click on ok to go back to staff listing page",
          icon: "success",
        }).then(function () {
          window.location.href = "/dashboard/staff";
        });
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
        selector: (row) => row.date,
        sortable: true,
        id: "Date",
        cell: (d) => (
          <div>
            <i className="far fa-calendar-alt"></i>
            <span className="align-left pl-2">
              {moment(d.date, "DD, MM, YYYY").format("llll")}
            </span>
          </div>
        ),
      },
      {
        id: "clock-in",
        name: "Clock In",
        selector: (row) => row.in,
        sortable: false,
        cell: (row, index) => (
          <div>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <input
                name="in"
                type="text"
                className="custom-table-input"
                value={
                  row.in == null
                    ? "00:00 am"
                    : moment(row.in, "hh:mm a").format("LT")
                }
                onChange={(e) => {
                  this.handleTableInput(e);
                }}
              />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                {row.in == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.in, "hh:mm a").format("LT")}
                  </span>
                )}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "Break-Start",
        name: "Break Start",
        selector: (row) => row.break,
        sortable: true,
        cell: (row, index) => (
          <div>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <input
                name="break"
                className="custom-table-input"
                type="text"
                value={
                  row.break == null
                    ? "00:00 am"
                    : moment(row.break, "hh:mm a").format("LT")
                }
                onChange={(e) => {
                  this.handleTableInput(e);
                }}
              />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                {row.break == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.break, "hh:mm a").format("LT")}
                  </span>
                )}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "Break-End",
        name: "Break End",
        selector: (row) => row.endBreak,
        sortable: true,
        cell: (row, index) => (
          <div>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <input
                name="endBreak"
                className="custom-table-input"
                value={
                  row.endBreak == null
                    ? "00:00 am"
                    : moment(row.endBreak, "hh:mm a").format("LT")
                }
                type="text"
                onChange={(e) => {
                  this.handleTableInput(e);
                }}
              />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                {row.endBreak == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.endBreak, "hh:mm a").format("LT")}
                  </span>
                )}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "Clock-Out",
        name: "Clock Out",
        selector: (row) => row.out,
        sortable: true,
        cell: (row, index) => (
          <div>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <input
                name="out"
                className="custom-table-input"
                value={
                  row.out == null
                    ? "00:00 am"
                    : moment(row.out, "hh:mm a").format("LT")
                }
                type="text"
                onChange={(e) => {
                  this.handleTableInput(e);
                }}
              />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                {row.out == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.out, "hh:mm a").format("LT")}
                  </span>
                )}
              </div>
            )}
          </div>
        ),
      },
      {
        id: "Break-hours",
        name: "Break hours",
        selector: (row) => row.btotal,
        sortable: true,
        cell: (d) => (
          <div>
            <i className="fas fa-hourglass-half"></i>

            <span className="pl-1">{d.btotal}</span>
          </div>
        ),
      },
      {
        id: "Total-hours",
        name: "Total hours",
        selector: (row) => row.total,
        sortable: true,
        cell: (d) => (
          <div>
            <i className="fas fa-hourglass-half"></i>

            <span className="pl-1">{d.total}</span>
          </div>
        ),
      },
      {
        key: "action",
        id: "Action",
        name: "Action",
        className: "action",
        cell: (row, index) => (
          <div
            className={`btn btn-default ui right pointing dropdown icon ${
              this.state.is_action_menu_active &&
              this.state.selected_row_index === index
                ? "active"
                : ""
            }`}
            onClick={() => this.open_setting_menu(row, index)}
          >
            <i className="setting icon" />
            <div
              className={`menu ${
                this.state.is_action_menu_active &&
                this.state.selected_row_index === index
                  ? "transition visible"
                  : ""
              }`}
            >
              <div className="item item-edit">Edit</div>
              <div className="item item-update">Update</div>
            </div>
          </div>
          // <button
          //   onClick={() => this.handleButtonClick(row, index)}
          //   id={"cell-" + row.id + "-undefined"}
          //   className={"ctn" + row.id}
          // >
          //   {!this.state.edit ? "Edit" : "Update"}
          // </button>
        ),
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
            <Card.Title as="h5">
              {userDetails.name} {userDetails.comment}
            </Card.Title>
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
                <div className="edit-employee-bottom-row clearfix">
                  <Button
                    className="btn btn-primary toggle-button float-start"
                    onClick={this.handleShowForm}
                  >
                    {!this.state.show ? "Edit Employee Details" : "Close Form"}
                  </Button>
                </div>
              </Col>
            )}

            <div className="row">
              <div className="col-sm-8">
                {this.state.user && this.state.show && (
                  <EditEmployee
                    user={this.state.user}
                    role={this.state.categoryRole}
                    location={this.state.categoryLocation}
                    employer={this.state.categoryEmployer}
                    onUpdate={(e) => this.setState({ show: false })}
                  />
                )}
              </div>
              <div className="col-sm-4">
                <img
                  src={userDetails.img}
                  className="img img-responsive img-custom"
                />
              </div>
            </div>

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
                expandableRows
                expandableRowsComponent={ExpandableComponent}
              />
            </DataTableExtensions>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default UserProfile;
