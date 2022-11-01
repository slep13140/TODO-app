import React, { Component } from "react";

import Task from "../task";

import { formatDistanceToNow } from "date-fns";

import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleCompleted, currentDate } = this.props;

    const elements = todos.map((item) => {
      const { id, createdDate, ...itemProps } = item;
      const created = formatDistanceToNow(createdDate, currentDate);

      return (
        <Task
          {...itemProps}
          created={created}
          key={id}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
