import React, { Component } from "react";

import "./task-filter.css";

export default class TaskFilter extends Component {
  render() {
    const { selected, value, onToggleSelected, filterCompleted } = this.props;
    let classNames = "";
    if (selected) {
      classNames += "selected";
    }

    return (
      <li>
        <button className={classNames} onClick={onToggleSelected}>
          {value}
        </button>
      </li>
    );
  }
}
