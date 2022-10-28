import React, { Component } from "react";

import Task from "../task";

import "./task-list.css";

import { formatDistanceToNow } from "date-fns";

const createDate = formatDistanceToNow(new Date());

export default class TaskList extends Component {
  render() {
    const { todos } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
      return <Task {...itemProps} key={id} />;
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
