import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './task.css'

export default class Task extends Component {
  constructor() {
    super()
    this.state = { editingTask: '' }
    this.inputRef = React.createRef()
    this.onTaskChange = (e) => {
      this.setState({
        editingTask: e.target.value,
      })
    }
    this.onSubmit = (e) => {
      const { keyId, onNewTask } = this.props
      const { editingTask } = this.state
      if (e.code === 'Enter') {
        if (editingTask.length === 0 || editingTask.trim().length === 0) {
          return
        }

        onNewTask(keyId, editingTask)
      }
    }
  }

  componentDidMount() {
    const { description } = this.props
    this.setState({
      editingTask: description,
    })
  }

  render() {
    const { editingTask } = this.state
    const { completed, filterCompleted, checked } = this.props
    const { onToggleCompleted, keyId, description } = this.props
    const { created, onDeleted, onEditing } = this.props
    const { doTimer, doPause, editing } = this.props
    const { timerMin, timerSec } = this.props
    const keyLabel = `${keyId} + 'Id'`
    const createTime = `created ${created} ago`
    const timer = `${timerMin}:${timerSec}`

    let classNames = ''
    if (completed) {
      classNames += 'completed'
    }
    if (filterCompleted && completed) {
      classNames += ' filterCompleted'
    } else if (filterCompleted && !completed) {
      classNames += 'filterCompleted'
    }
    if (editing) {
      classNames += ' editing'
      this.inputRef.current.focus()
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={checked} onChange={onToggleCompleted} />
          <label htmlFor={keyLabel}>
            <span className="description" role="presentation" onClick={onToggleCompleted}>
              {description}
            </span>
            <span className="description description-timer">
              <button type="button" className="icon-play" aria-label="play-timer" onClick={doTimer} />
              <button type="button" className="icon-pause" aria-label="pause-timer" onClick={doPause} />
              <span className="timer">{timer}</span>
            </span>
            <span className="created">{createTime}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="icon-edit" onClick={onEditing} />
          <button type="button" className="icon icon-destroy" aria-label="icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          onChange={this.onTaskChange}
          onKeyPress={this.onSubmit}
          value={editingTask}
          ref={this.inputRef}
        />
      </li>
    )
  }
}

Task.defaultProps = {
  description: 'New task',
  completed: false,
  checked: false,
}

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  checked: PropTypes.bool,
  filterCompleted: PropTypes.bool.isRequired,
  doTimer: PropTypes.func.isRequired,
  doPause: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
}
