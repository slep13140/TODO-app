import React from "react";

import Task from "../task";

import "./task-list.css";

import { formatDistanceToNow } from "date-fns";

const createDate = formatDistanceToNow(new Date());

const TaskList = () => {
  return (
    <ul className="todo-list">
      <li className="completed">
        <Task label="Completed task" createdTime="created 17 seconds ago" />
      </li>
      <li className="editing">
        <Task label="Editing task" createdTime="created 5 minutes ago" />
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
      <li>
        <Task label="Active task" createdTime="created 5 minutes ago" />
      </li>
    </ul>
  );
};

export default TaskList;
