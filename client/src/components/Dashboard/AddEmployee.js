import React from "react";

const AddEmployee = (props) => {
  const {
    name,
    role,
    hire,
    site,
    edit,
    addNewEmployee,
    getNewEmployee
  } = props;
  return (
    <React.Fragment>
      <form onSubmit={addNewEmployee}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={getNewEmployee}
          placeholder="Name"
        />
        <input
          type="text"
          name="role"
          value={role}
          onChange={getNewEmployee}
          placeholder="role"
        />
        <input
          type="text"
          name="hire"
          value={hire}
          onChange={getNewEmployee}
          placeholder="hire"
        />
        <input
          type="text"
          name="site"
          value={site}
          onChange={getNewEmployee}
          placeholder="site"
        />
        <button>{!edit ? "Add Employee" : "Edit Employee"}</button>
      </form>
    </React.Fragment>
  );
};

export default AddEmployee;
