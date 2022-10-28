import React from "react";

import "./task.css";

const Task = ({ classList, description, created }) => {
  return (
    <li className={classList}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" defaultValue="Editing task" />
    </li>
  );
};

export default Task;
