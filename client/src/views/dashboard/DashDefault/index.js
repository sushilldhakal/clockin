import React from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import avatar1 from "../../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../../assets/images/user/avatar-3.jpg";

const DashDefault = () => {
  const data = [
    {
      id: 1,
      image: avatar1,
      name: "sushil dhakal",
      role: "1988",
      pin: "9265",
      hire: "VIK",
      site: "Port Melbourne",
      clockin: "10:00 am",
      userDetail: "dashboard/staff/username",
    },
    {
      id: 2,
      image: avatar2,
      name: "suman shrestha",
      role: "1988",
      pin: "9234",
      hire: "NOVA",
      site: "Dandenong",
      clockin: "10:30 am",
      userDetail: "dashboard/staff/username",
    },
    {
      id: 3,
      image: avatar3,
      name: "Gur Bedi",
      role: "1988",
      pin: "9230",
      hire: "Company Hire",
      site: "Port Melbourne",
      clockin: "08:30 am",
      userDetail: "dashboard/staff/username",
    },
  ];
  const columns = [
    {
      name: "Staff Image",
      selector: "image",
      sortable: false,
      cell: (d) => <img src={d.image} alt="img-circle rounded-circle"></img>,
    },
    {
      name: "Time",
      selector: "clockin",
      sortable: true,
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
    data,
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
                  data={data}
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
