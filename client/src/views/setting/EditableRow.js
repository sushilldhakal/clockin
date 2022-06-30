import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="username"
          required="required"
          placeholder="Enter an username..."
          name="username"
          value={editFormData.username}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="password"
          required="required"
          placeholder="Enter a password..."
          name="password"
          value={''}
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
