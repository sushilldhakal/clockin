import React, { Component } from "react";
import PropTypes from "prop-types";

import Tab from "./Tab";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
      activeTab: this.props.children[0].props.value,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });

    document.querySelector(".isActive").removeAttribute("value");
    document.querySelector(".isActive").classList.remove("isActive");
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label, value } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                value={value}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
