import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
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
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    );
  }
}
