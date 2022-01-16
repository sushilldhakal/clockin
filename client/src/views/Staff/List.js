import React from "react";

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { CSVLink } from "react-csv";
const List = (props) => {
  const { getFilterData, editEmployee } = props;

  const data = getFilterData();

  const columns = [
    {
      name: "Name",
      selector: (row) => row["name"],
      sortable: true,
      cell: (d) => <Link to={"/dashboard/each-staff/" + d._id}>{d.name}</Link>,
    },
    {
      name: "Role",
      selector: (row) => row["role"],
      sortable: true,
    },
    {
      name: "Pin",
      selector: (row) => row["pin"],
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
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row["phone"],
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <React.Fragment>
      <div className="container">
        {/* {this.getFilterData().length !== 0 ? this.displayData() : <p>No terms</p>} */}

        {/* Count return element from array. If equals to 0 show message*/}
        {getFilterData().length === 0 ? (
          <div>
            <p className="c-msg">Employee Not Found</p>
            <button className="c-btn" onClick={editEmployee}>
              Clear Term
            </button>
          </div>
        ) : (
          <div>
            <DataTableExtensions
              print={true}
              exportHeaders={true}
              export={true}
              filterPlaceholder="Search"
              {...tableData}
            >
              <DataTable
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default List;
