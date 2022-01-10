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
    edit: false,
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "timesheets/" + this.props.match.params.staff_id)
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets,
          user: res.data.user[0],
        });
        console.log(res.data.timesheets);
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

  handleButtonClick = (row) => {
    this.setState({
      edit: !this.state.edit,
    });

    console.log(row.target.id);
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
        selector: (row) => row["date"],
        sortable: true,
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
        name: "Clock In",
        selector: (row) => row["in"],
        sortable: false,
        cell: (d) => (
          <div>
            {d.in == null ? (
              <input name="in" type="text" value="" />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                <span className="pl-1">
                  {moment(d.in, "hh:mm a").format("LT")}
                </span>
              </div>
            )}
          </div>
        ),
      },
      {
        name: "Break Start",
        selector: (row) => row["break"],
        sortable: true,
        cell: (d) => (
          <div>
            {d.break == null ? (
              <input name="break" type="text" value="" />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                <span className="pl-1">
                  {moment(d.break, "hh:mm a").format("LT")}
                </span>
              </div>
            )}
          </div>
        ),
      },
      {
        name: "Break End",
        selector: (row) => row["endBreak"],
        sortable: true,
        cell: (d) => (
          <div>
            {d.endBreak == null ? (
              <input name="endBreak" type="text" value="" />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                <span className="pl-1">
                  {moment(d.endBreak, "hh:mm a").format("LT")}
                </span>
              </div>
            )}
          </div>
        ),
      },
      {
        name: "Clock Out",
        selector: (row) => row["out"],
        sortable: true,
        cell: (d) => (
          <div>
            {d.out == null ? (
              <input name="out" type="text" value="" />
            ) : (
              <div>
                <i className="far fa-clock"></i>
                <span className="pl-1">
                  {moment(d.out, "hh:mm a").format("LT")}
                </span>
              </div>
            )}
          </div>
        ),
      },
      {
        name: "Break hours",
        selector: (row) => row["btotal"],
        sortable: true,
        cell: (d) => (
          <div>
            <i className="fas fa-hourglass-half"></i>

            <span className="pl-1">{d.btotal}</span>
          </div>
        ),
      },
      {
        name: "Total hours",
        selector: (row) => row["total"],
        sortable: true,
        cell: (d) => (
          <div>
            <i className="fas fa-hourglass-half"></i>

            <span className="pl-1">{d.total}</span>
          </div>
        ),
      },
      {
        name: "Action",
        cell: (d) => (
          <button onClick={this.handleButtonClick} id={d.ID}>
            {!this.state.edit ? "Edit" : "Update"}
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
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

        {/* <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>3-1-2022 To 9-1-2022</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Header>
                  <span className="float-start">Total Hours</span>

                  <span className="float-end">40hrs</span>
                </Card.Header>
              </Card>
              {timesheets.map((time, id) => {
                return (
                  <Card key={id}>
                    <Card.Header>
                      <Card.Title>
                        <i className="far fa-calendar-alt"></i>
                        <span className="align-left">
                          {moment(time.date, "DD, MM, YYYY").format("llll")}
                        </span>
                      </Card.Title>
                    </Card.Header>

                    <Card.Body>
                      <Row>
                        <Col>
                          <i className="far fa-clock"></i>
                          {time.in} - {time.out}
                          <br />
                          <i className="fas fa-mug-hot"></i>
                          {time.btotal}
                        </Col>
                        <Col>
                          <span className="float-end">
                            <i className="fas fa-hourglass-half"></i>
                            {time.total}
                          </span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
      </div>
    );
  }
}
export default UserProfile;
