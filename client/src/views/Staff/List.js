import React from "react";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const List = (props) => {
  const { getFilterData, handleClearList, deleteEmployee, editEmployee } =
    props;

  const data = [
    {
      id: 1,
      name: "sushil dhakal",
      role: "1988",
      pin: "9265",
      hire: "VIK",
      site: "Port Melbourne",
      email: "test@test.com",
      mobile: "0433926000",
    },
    {
      id: 2,
      name: "suman shrestha",
      role: "1988",
      pin: "9234",
      hire: "NOVA",
      site: "Port Melbourne",
      email: "test@test.com",
      mobile: "0433926000",
    },
  ];

  // const data = [
  // getFilterData().map((item) => {
  //   {
  //     id: item.id;
  //     name: item.name;
  //     role: item.role;
  //     hire: item.hire;
  //     site: item.site;
  //     email: item.email;
  //     phone: item.phone;
  //     pin: item.pin;
  //     dob: item.dob;
  //   }
  // }),
  // ];

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
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
      name: "Mobile",
      selector: "mobile",
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

          <ul className="c-list__employees">
            {getFilterData().map((item) => {
              return (
                <li className="c-list__employee" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                  <p>{item.hire}</p>
                  <p>{item.site}</p>
                  <p>{item.email}</p>
                  <p>{item.phone}</p>
                  <p>{item.pin}</p>
                  <p>{item.dob}</p>
                  <button className="btn btn-primary"> View Timesheet</button>

                  {/* <span
                    className="c-close"
                    onClick={() => deleteEmployee(item.id)}
                  >
                    X
                  </span> */}
                  <button
                    className="btn edit-employee-details btn-warning"
                    onClick={() => editEmployee(item.id)}
                  >
                    edit
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default List;
