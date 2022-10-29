import React, { Component } from "react";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    if (e.code === "Enter") {
      this.props.onTaskAdded(this.state.label);
      this.setState({
        label: "",
      });
    }
  };
  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.onLabelChange}
        onKeyPress={this.onSubmit}
        value={this.state.label}
      />
    );
  }
}
