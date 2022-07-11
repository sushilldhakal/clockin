import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import moment from "moment";
import { API_SERVER } from "../../../config/constant";

const DashDefault = () => {
  //fetch timesheets
  const [timesheets, setTimesheets] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(API_SERVER + "dashboard", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setTimesheets(res.data.timesheets);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const paginationComponentOptions = {
    selectAllRowsItem: true,
  };

  const columns = [
    {
      id: "1",
      name: "Staff Image",
      selector: (row) => row.image,
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
                alt="user-main"
              />
              <img
                src={d.image}
                className="img-circle rounded-circle show-on-popover"
                alt="user-main"
                onClick={() => window.open(d.image, "_blank")}
              />
            </span>
          )}
        </div>
      ),
    },
    {
      id: "2",
      name: "Name",
      selector: (row) => row.userDetail,
      sortable: true,
      cell: (d) => <Link to={"/dashboard/each-staff/" + d._id}>{d.name}</Link>,
    },
    {
      id: "3",
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      id: "4",
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
      cell: (d) => <span>{d.time}</span>,
    },
    {
      id: "5",
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },

    {
      id: "6",
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      id: "7",
      name: "Employe",
      selector: (row) => row.hire,
      sortable: true,
    },
    {
      id: "8",
      name: "Location",
      selector: (row) => row.site,
      sortable: true,
      cell: (d) => (
        <span>
          {d.where == "," ? (
            <span className="pl-1">{d.site}</span>
          ) : (
            <a
              href={`https://www.google.com/maps/place/` + d.where}
              target="_blank"
            >
              {d.site}
            </a>
          )}
        </span>
      ),
    },
  ];

  const result = timesheets.filter((o) =>
    Object.values(o).some((v) => v !== null)
  );
  console.log(result);

  const tableData = {
    columns,
    data: result,
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
                  defaultSortFieldId="4"
                  defaultSortAsc={false}
                  pagination
                  paginationPerPage="30"
                  highlightOnHover
                  paginationComponentOptions={paginationComponentOptions}
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
