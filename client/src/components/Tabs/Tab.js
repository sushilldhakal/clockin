import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick, value } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, value },
    } = this;

    let className = "tab-list-item " + value;

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <span value={value} className={className} onClick={onClick}>
        {label}
      </span>
    );
  }
}

export default Tab;
