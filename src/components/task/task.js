import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  state = {
    completed: false,
  };

  onTaskCompleted = () => {
    this.setState(({ completed }) => {
      return { completed: !completed };
    });
  };
  render() {
    const { description, created, onDeleted } = this.props;
    const { completed } = this.state;
    let classNames = "";
    if (completed) {
      classNames += "completed";
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onTaskCompleted}>
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
