import React from "react";

import TaskList from "../task-list";
import Footer from "../footer";
import NewTaskForm from "../new-task-form";

import "./app.css";

const todoData = [
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
];

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
