import React, { Component } from 'react'

import './NewTaskForm.css'

class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      labelTask: '',
      timerMin: '',
      timerSec: '',
    }

    this.onLabelChange = (e) => {
      const word = e.target.className.split(' ')
      if (word.length === 1) {
        this.setState({
          labelTask: e.target.value,
        })
      } else if (word.length === 2 && Number(e.target.value)) {
        this.setState({ [word[1]]: e.target.value })
      }
    }

    this.onSubmit = (e) => {
      const { onTaskAdded } = this.props
      const { labelTask, timerMin, timerSec } = this.state
      if (e.code === 'Enter') {
        if (!timerMin && !timerSec) {
          return
        }
        if (labelTask.length === 0 || labelTask.trim().length === 0) {
          return
        }

        onTaskAdded(labelTask, timerMin, timerSec)
        this.setState({
          labelTask: '',
          timerMin: '',
          timerSec: '',
        })
      }
    }
  }

  render() {
    const { labelTask, timerMin, timerSec } = this.state
    return (
      <form className="new-todo-form">
        <label htmlFor="task">
          <input
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            onKeyPress={this.onSubmit}
            value={labelTask}
          />
        </label>
        <label htmlFor="min">
          <input
            className="new-todo-form__timer timerMin"
            placeholder="Min"
            onChange={this.onLabelChange}
            onKeyPress={this.onSubmit}
            value={timerMin}
          />
        </label>
        <label htmlFor="sec">
          <input
            className="new-todo-form__timer timerSec"
            placeholder="Sec"
            onChange={this.onLabelChange}
            onKeyPress={this.onSubmit}
            value={timerSec}
          />
        </label>
      </form>
    )
  }
}
export default NewTaskForm
