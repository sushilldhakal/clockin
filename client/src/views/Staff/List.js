import React from "react";

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { CSVLink } from "react-csv";
const List = (props) => {
  const { getFilterData, handleClearList, deleteEmployee, editEmployee } =
    props;

  const data = getFilterData();

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (d) => <Link to={d.userDetail}>{d.name}</Link>,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Pin",
      selector: "pin",
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
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <React.Fragment>
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
          <DataTableExtensions {...tableData}>
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
    </React.Fragment>
  );
};

export default List;
