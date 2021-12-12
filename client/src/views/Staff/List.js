import React from "react";

import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

const List = (props) => {
  const { getFilterData, handleClearList, deleteEmployee, editEmployee } =
    props;

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
      email: "test@test.com",
      phone: "04040404",
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
      email: "test@test.com",
      phone: "04040404",
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
      email: "test@test.com",
      phone: "04040404",
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
                    Edit
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
