import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

const FlagLocation = () => {
  //fetch timesheets
  const [timesheets, setTimesheets] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(API_SERVER + "flag")
      .then((res) => {
        setTimesheets(res.data.timesheets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var staffNoImage = timesheets.filter(function (hero) {
    return hero.image == null;
  });
  const columns = [
    {
      name: "Date",
      selector: (row) => row["date"],
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row["time"],
      sortable: true,
      cell: (d) => <span>{d.time}</span>,
    },
    {
      name: "Type",
      selector: (row) => row["type"],
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row["userDetail"],
      sortable: true,
      cell: (d) => <Link to={"/dashboard/each-staff/" + d._id}>{d.name}</Link>,
    },
    {
      name: "Role",
      selector: (row) => row["role"],
      sortable: true,
    },
    {
      name: "Employe",
      selector: (row) => row["hire"],
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row["site"],
      sortable: true,
      cell: (d) => <span>{d.site}</span>,
    },
  ];

  const tableData = {
    columns,
    data: staffNoImage,
  };
  console.log(timesheets);
  return (
    <React.Fragment>
      <Card className="Recent-Users">
        <Card.Header>
          <Card.Title as="h5">Staff without location</Card.Title>
        </Card.Header>
        <Card.Body className="px-0 py-2">
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={staffNoImage}
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
    </React.Fragment>
  );
};

export default FlagLocation;
