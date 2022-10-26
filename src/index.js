import React from "react";
import ReactDOM from "react-dom/client";

import TaskList from "./components/task-list";
import Footer from "./components/footer";
import NewTaskForm from "./components/new-task-form";

import "./index.css";

const container = document.body;

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

const root = ReactDOM.createRoot(container);
root.render(<App />);
