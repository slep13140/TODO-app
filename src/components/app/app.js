import React, { Component } from "react";

import TaskList from "../task-list";
import Footer from "../footer";
import NewTaskForm from "../new-task-form";

import "./app.css";

export default class App extends Component {
  maxId = 10;
  state = {
    todoData: [
      {
        description: "Completed task",
        created: "created 17 seconds ago",
        classList: "completed",
        id: 1,
      },
      {
        description: "Editing task",
        created: "created 5 minutes ago",
        classList: "editing",
        id: 2,
      },
      {
        description: "Active task",
        created: "created 5 minutes ago",
        classList: null,
        id: 3,
      },
    ],
  };
  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };
  addTask = (text) => {
    const newTask = {
      description: text,
      created: "created 5 minutes ago",
      classList: null,
      id: this.maxId++,
    };
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newTask];
      return {
        todoData: newArray,
      };
    });
  };
  render() {
    const { todoData } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList todos={todoData} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </section>
    );
  }
}
