import React, { Component } from "react";
import PropTypes from "prop-types";

import "./task-filter.css";

export default class TaskFilter extends Component {
  static defaultProps = {
    selected: false,
  };
  static propTypes = {
    selected: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onToggleSelected: PropTypes.func.isRequired,
  };
  render() {
    const { selected, value, onToggleSelected } = this.props;

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
