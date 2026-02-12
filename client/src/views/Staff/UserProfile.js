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
import Pagination from "../../components/Pagination/Pagination";
import LazyImage from "../../components/LazyImage/LazyImage";

import moment, { relativeTimeThreshold } from "moment";

const ExpandableComponent = ({ data }) => {
  return (
    <table className="inner-table">
      <thead>
        <tr>
          <th></th>
          <th>
            <div className="image-popover">
              <LazyImage src={data.imagein} className="img-circle rounded-circle" />
              <LazyImage
                src={data.imagein}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <LazyImage
                src={data.imagebreak}
                className="img-circle rounded-circle"
              />
              <LazyImage
                src={data.imagebreak}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <LazyImage
                src={data.imageendBreak}
                className="img-circle rounded-circle"
              />
              <LazyImage
                src={data.imageendBreak}
                className="img-circle rounded-circle show-on-popover"
              />
            </div>
          </th>
          <th>
            <div className="image-popover">
              <LazyImage src={data.imageout} className="img-circle rounded-circle" />
              <LazyImage
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
            {data.wherein != null ? (
              <a
                href={"https://www.google.com/maps/place/" + data.wherein}
                target="_blank"
              >
                Location
              </a>
            ) : (
              <span>No record</span>
            )}
          </td>
          <td>
            {data.wherebreak != null ? (
              <a
                href={"https://www.google.com/maps/place/" + data.wherebreak}
                target="_blank"
              >
                Location
              </a>
            ) : (
              <span>No record</span>
            )}
          </td>
          <td>
            {data.whereendBreak != null ? (
              <a
                href={"https://www.google.com/maps/place/" + data.whereendBreak}
                target="_blank"
              >
                Location
              </a>
            ) : (
              <span>No record</span>
            )}
          </td>
          <td>
            {data.whereout != null ? (
              <a
                href={"https://www.google.com/maps/place/" + data.whereout}
                target="_blank"
              >
                Location
              </a>
            ) : (
              <span>No record</span>
            )}
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
    date: "",
    in: "",
    break: "",
    breakEnd: "",
    out: "",
    selected_row_index: 0,
    is_action_menu_active: false,
    edited: false,
    loading: true,
    pagination: null,
  };

  fetchTimesheets = (page = 1, limit = 20) => {
    axios
      .get(API_SERVER + "timesheets/" + this.props.match.params.staff_id, {
        params: { page, limit },
      })
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets || [],
          user: (res.data.user && res.data.user[0]) || this.state.user,
          loading: false,
          pagination: res.data.pagination || null,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  componentDidMount() {
    this.retrieveRole = this.retrieveRole.bind(this);
    this.retrieveLocation = this.retrieveLocation.bind(this);
    this.retrieveEmployer = this.retrieveEmployer.bind(this);
    this.sendData = this.sendData.bind(this);
    this.retrieveRole();
    this.retrieveLocation();
    this.retrieveEmployer();
    this.fetchTimesheets(1, 20);
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

  open_setting_menu(row, index) {
    this.setState({
      is_action_menu_active: !this.state.is_action_menu_active,
      selected_row_index: index,
    });
  }

  sendData(row, index) {
    const data = {};

    if (this.state.in) {
      data.in = this.state.in;
    }
    if (this.state.break) {
      data.break = this.state.break;
    }
    if (this.state.breakEnd) {
      data.endBreak = this.state.breakEnd;
    }
    if (this.state.out) {
      data.out = this.state.out;
    }

    data.pin = row.pin;
    data.date = row.date;
    data.user_id = this.props.match.params.staff_id;
    axios
      .post(API_SERVER + "update-timesheet", data)
      .then((res) => {
        swal({
          title: "User time log updated",
          text: "User time log added Successful, please click on ok to load user time log",
          icon: "success",
        }).then(function () {
          window.location.reload();
        });
      })
      .catch((err) => {
        swal(err.response.data.message);
      });
  }

  handleTableInput = (e) => {
    let input = e.target;
    let name = input.name;
    let value = input.value;
    this.setState({
      [name]: value,
    });
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
        sortFunction: (rowA, rowB) => {
          const dA = moment(rowA.date, "DD-MM-YYYY").valueOf();
          const dB = moment(rowB.date, "DD-MM-YYYY").valueOf();
          return dA - dB;
        },
        cell: (row, index) => (
          <div>
            <i className="far fa-calendar-alt"></i>

            <span className="align-left pl-2">
              {moment(row.date, "DD, MM, YYYY").format("ddd Do MMMM	YYYY")}
            </span>
          </div>
        ),
      },
      {
        id: "clock-in",
        name: "Clock In",
        selector: (row) => [row.in, row.workingin],
        sortable: false,
        cell: (row, index) => (
          <div className={row.workingin}>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <div className={row.workingin}>
                <i className="far fa-clock"></i>
                {row.in == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.in, "hh:mm a").format("LT")}
                  </span>
                )}
                <input
                  name="in"
                  type="time"
                  className="custom-table-input"
                  placeholder="20:20:00"
                  value={this.state.in}
                  onChange={(e) => {
                    this.handleTableInput(e);
                  }}
                />
              </div>
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
        selector: (row) => [row.break, row.workingbreak],
        sortable: true,
        cell: (row, index) => (
          <div className={row.workingbreak}>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <div className={row.workingbreak}>
                <i className="far fa-clock"></i>
                {row.break == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.break, "hh:mm a").format("LT")}
                  </span>
                )}

                <input
                  name="break"
                  className="custom-table-input"
                  type="time"
                  placeholder="20:20:00"
                  value={this.state.break}
                  onChange={(e) => {
                    this.handleTableInput(e);
                  }}
                />
              </div>
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
        selector: (row) => [row.endBreak, row.workingendBreak],
        sortable: true,
        cell: (row, index) => (
          <div className={row.workingendBreak}>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <div>
                <i className="far fa-clock"></i>
                {row.endBreak == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.endBreak, "hh:mm a").format("LT")}
                  </span>
                )}

                <input
                  name="breakEnd"
                  className="custom-table-input"
                  placeholder="20:20:00"
                  value={this.state.breakEnd}
                  type="time"
                  onChange={(e) => {
                    this.handleTableInput(e);
                  }}
                />
              </div>
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
          <div className={row.workingout}>
            {this.state.is_action_menu_active &&
            this.state.selected_row_index === index ? (
              <div>
                <i className="far fa-clock"></i>
                {row.out == null ? (
                  <span className="pl-1">00:00 am</span>
                ) : (
                  <span className="pl-1">
                    {moment(row.out, "hh:mm a").format("LT")}
                  </span>
                )}

                <input
                  name="out"
                  className="custom-table-input"
                  value={this.state.out}
                  placeholder="20:20:00"
                  type="time"
                  onChange={(e) => {
                    this.handleTableInput(e);
                  }}
                />
              </div>
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
            <div
              className={`menu ${
                this.state.is_action_menu_active &&
                this.state.selected_row_index === index
                  ? "transition visible"
                  : ""
              }`}
            >
              <div className="btn btn-custom btn-border item item-edit">
                Edit
              </div>
              <div
                onClick={() => this.sendData(row, index)}
                className="btn btn-custom btn-border item item-update"
              >
                Update
              </div>
            </div>
          </div>
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
                {userDetails.img ? (
                  <LazyImage
                    src={userDetails.img}
                    className="img img-responsive img-custom"
                  />
                ) : (
                  <span></span>
                )}
              </div>
            </div>
            <div className="single-user-table">
              {this.state.pagination && (
                <Pagination
                  pagination={this.state.pagination}
                  onPageChange={(p) => this.fetchTimesheets(p, 20)}
                  onLimitChange={(l) => this.fetchTimesheets(1, l)}
                />
              )}
              <DataTableExtensions
                print={true}
                exportHeaders={true}
                export={true}
                filterPlaceholder="Search"
                {...tableData}
              >
                <DataTable
                  columns={columns}
                  data={timesheets}
                  progressPending={this.state.loading}
                  noHeader
                  defaultSortField="Date"
                  defaultSortAsc={false}
                  pagination={false}
                  highlightOnHover
                  sortIcon={<SortIcon />}
                  expandableRows
                  expandableRowsComponent={ExpandableComponent}
                />
              </DataTableExtensions>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default UserProfile;
