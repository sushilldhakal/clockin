import React from "react";

const Search = (props) => {
  const { search, getFilterValue } = props;
  return (
    <React.Fragment>
      <input
        className="c-input"
        type="text"
        autoFocus
        name="search"
        value={search}
        onChange={getFilterValue}
        placeholder="Search Employee"
      />
    </React.Fragment>
  );
};

export default Search;
