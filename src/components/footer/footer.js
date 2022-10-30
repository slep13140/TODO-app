import React from "react";

import TaskFilter from "../task-filter";

import "./footer.css";

const Footer = ({
  filters,
  onToggleSelected,
  onFilterCompleted,
  onClearCompleted,
}) => {
  const elements = filters.map((item) => {
    const { id, value, ...itemProps } = item;

    return (
      <TaskFilter
        key={id}
        value={value}
        {...itemProps}
        onToggleSelected={() => {
          onToggleSelected(id);
          onFilterCompleted(value);
        }}
      />
    );
  });
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <ul className="filters">{elements}</ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
