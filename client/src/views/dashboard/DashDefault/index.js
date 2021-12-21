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
  React.useEffect(() => {
    axios
      .get(API_SERVER + "timesheets")
      .then((res) => {
        setTimesheets(res.data.timesheets);
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
      name: "Time",
      selector: "time",
      sortable: true,
      cell: (d) => <span>{d.time}</span>,
    },
    {
      name: "Name",
      selector: "userDetail",
      sortable: true,
      cell: (d) => <Link to={d.userDetail}>{d.name}</Link>,
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
