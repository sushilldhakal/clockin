import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>editable</td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="password"
          required="required"
          placeholder="Enter a password..."
          name="password"
          value={editFormData.password}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter a location..."
          name="location"
          value={editFormData.location}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
