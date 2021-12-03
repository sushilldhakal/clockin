import React from "react";

const List = (props) => {
  const {
    getFilterData,
    handleClearList,
    deleteEmployee,
    editEmployee
  } = props;
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
                  // onClick={() => editEmployee(item.id)}
                >
                  edit
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default List;
