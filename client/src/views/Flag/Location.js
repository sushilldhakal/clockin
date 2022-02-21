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
  const [staffNoLocation, setTimesheets] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(API_SERVER + "flag")
      .then((res) => {
        setTimesheets(res.data.staffNoLocation);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // var staffNoLocation = timesheets.filter(function (hero) {
  //   return hero.where == "," || hero.where == null;
  // });
  const columns = [
    {
      name: "Staff Image",
      selector: (row) => row["image"],
      sortable: false,
      cell: (d) => (
        <div className="image-popover">
          {d.image == null ? (
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
    data: staffNoLocation,
  };
  return (
    <React.Fragment>
      <Card className="Recent-Users">
        <Card.Header>
          <Card.Title as="h5">Staff without location</Card.Title>
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
              data={staffNoLocation}
              progressPending={loading}
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
