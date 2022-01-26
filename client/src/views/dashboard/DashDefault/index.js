import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import { API_SERVER } from "../../../config/constant";

const DashDefault = () => {
  //fetch timesheets
  const [timesheets, setTimesheets] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(API_SERVER + "dashboard", {headers: {token: localStorage.getItem("token")}})
      .then((res) => {
        setTimesheets(res.data.timesheets);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: "Staff Image",
      selector: "image",
      sortable: false,
      cell: (d) => (
        <div className="image-popover">
          {!d.image ? (
            <span className="pl-1">No Image</span>
          ) : (
            <span>
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
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Name",
      selector: "userDetail",
      sortable: true,
      cell: (d) => <Link to={"/dashboard/each-staff/" + d._id}>{d.name}</Link>,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Time",
      selector: "time",
      sortable: true,
      cell: (d) => <span>{d.time}</span>,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },

    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Employe",
      selector: "hire",
      sortable: true,
    },
    {
      name: "Location",
      selector: "site",
      sortable: true,
      cell: (d) => (
        <span>
          {d.where == null ? (
            <span className="pl-1">{d.site}</span>
          ) : (
            <a href={"https://maps.google.com/places" + d.where} target="_blank">
              {d.site}
            </a>
          )}
        </span>
      ),
    },
  ];

  const tableData = {
    columns,
    data: timesheets,
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={12} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent ClockIn Staff</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <DataTableExtensions
                print={false}
                exportHeaders={true}
                export={false}
                filterPlaceholder="Search"
                {...tableData}
              >
                <DataTable
                  columns={columns}
                  data={timesheets}
                  noHeader
                  progressPending={loading}
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
    </React.Fragment>
  );
};

export default DashDefault;
