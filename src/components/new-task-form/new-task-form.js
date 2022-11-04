import React, { Component } from 'react'

import './new-task-form.css'

class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
    }
    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }
    this.onSubmit = (e) => {
      const { onTaskAdded } = this.props
      const { label } = this.state
      if (e.code === 'Enter') {
        onTaskAdded(label)
        this.setState({
          label: '',
        })
      }
    }
  }

  render() {
    const { label } = this.state
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onLabelChange}
        onKeyPress={this.onSubmit}
        value={label}
      />
    )
  }
}
export default NewTaskForm
