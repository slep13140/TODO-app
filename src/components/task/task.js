import React, { Component } from "react";
import PropTypes from "prop-types";

import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    description: "New task",
    completed: false,
    checked: false,
  };

  static propTypes = {
    description: PropTypes.string,
    created: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    completed: PropTypes.bool,
    checked: PropTypes.bool,
    filterCompleted: PropTypes.bool.isRequired,
  };
  render() {
    const {
      description,
      created,
      onDeleted,
      onToggleCompleted,
      completed,
      checked,
      filterCompleted,
    } = this.props;

    let classNames = "";
    if (completed) {
      classNames += "completed";
    }
    if (filterCompleted && completed) {
      classNames += " filterCompleted";
    } else if (filterCompleted && !completed) {
      classNames += "filterCompleted";
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="description" onClick={onToggleCompleted}>
              {description}
            </span>
            <span className="created">created {created} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    );
  }
}
