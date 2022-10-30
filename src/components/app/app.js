import React, { Component } from "react";

import TaskList from "../task-list";
import Footer from "../footer";
import NewTaskForm from "../new-task-form";

import "./app.css";

export default class App extends Component {
  maxId = 10;
  state = {
    todoData: [
      this.createNewTask("Completed task", "created 17 seconds ago"),
      this.createNewTask("Editing task"),
      this.createNewTask("Active task"),
    ],
    filtersData: [
      { selected: true, value: "All", id: 1 },
      { selected: false, value: "Active", id: 2 },
      { selected: false, value: "Completed", id: 3 },
    ],
  };
  createNewTask(description, created = "created 5 minutes ago") {
    return {
      description,
      created,
      completed: false,
      checked: false,
      filterCompleted: false,
      id: this.maxId++,
    };
  }
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
    const newTask = this.createNewTask(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newTask];
      return {
        todoData: newArray,
      };
    });
  };
  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
        checked: !oldItem.checked,
      };
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };
  onToggleSelected = (id) => {
    this.setState(({ filtersData }) => {
      const idx = filtersData.findIndex((el) => el.id === id);
      const newArr = JSON.parse(JSON.stringify(filtersData)).map((item) => {
        if (item.value !== filtersData[idx].value) {
          item.selected = false;
        } else if (filtersData[idx].selected === true) {
          item.selected = true;
        } else {
          item.selected = !item.selected;
        }
        return item;
      });
      return {
        filtersData: newArr,
      };
    });
  };
  onFilterCompleted = (value) => {
    if (value === "Active") {
      this.setState(({ todoData }) => {
        const newArr = JSON.parse(JSON.stringify(todoData)).map((item) => {
          if (item.checked) {
            item.filterCompleted = true;
          } else {
            item.filterCompleted = false;
          }
          return item;
        });
        return {
          todoData: newArr,
        };
      });
    } else if (value === "Completed") {
      this.setState(({ todoData }) => {
        const newArr = JSON.parse(JSON.stringify(todoData)).map((item) => {
          if (!item.checked) {
            item.filterCompleted = true;
          } else {
            item.filterCompleted = false;
          }
          return item;
        });
        return {
          todoData: newArr,
        };
      });
    } else if (value === "All") {
      this.setState(({ todoData }) => {
        const newArr = JSON.parse(JSON.stringify(todoData)).map((item) => {
          item.filterCompleted = false;
          return item;
        });
        return {
          todoData: newArr,
        };
      });
    }
  };
  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData)).filter(
        (item) => !item.completed
      );
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData, filtersData } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer
            filters={filtersData}
            onToggleSelected={this.onToggleSelected}
            onFilterCompleted={this.onFilterCompleted}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
