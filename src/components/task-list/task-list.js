import React from "react";

import Task from "../task";

import "./task-list.css";

import { formatDistanceToNow } from "date-fns";

const createDate = formatDistanceToNow(new Date());

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { classList, id, editing, ...itemProps } = item;
    return (
      <li key={id} className={classList}>
        <Task {...itemProps} />
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
