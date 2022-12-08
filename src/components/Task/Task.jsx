import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './Task.css'

function Task(props) {
  const [editingTask, setEditingTask] = useState('')
  const inputRef = useRef()

  const { completed, filterCompleted, checked } = props
  const { onToggleCompleted, keyId, description } = props
  const { created, onDeleted, onEditing } = props
  const { doTimer, doPause, editing } = props
  const { timerMin, timerSec, onNewTask } = props
  const keyLabel = `${keyId} + 'Id'`
  const createTime = `created ${created} ago`
  const timer = `${timerMin}:${timerSec}`

  useEffect(() => setEditingTask(description), [])

  const onSubmit = (e) => {
    if (e.code === 'Enter') {
      if (editingTask.length === 0 || editingTask.trim().length === 0) {
        return
      }
      onNewTask(keyId, editingTask)
    }
  }

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
    inputRef.current.focus()
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" id={keyLabel} type="checkbox" checked={checked} onChange={onToggleCompleted} />
        <label htmlFor={keyLabel}>
          <span className="description" role="presentation" onClick={onToggleCompleted}>
            {description}
          </span>
          <span className="description description-timer">
            <button type="button" className="icon-play" aria-label="play-timer" title="play timer" onClick={doTimer} />
            <button
              type="button"
              className="icon-pause"
              aria-label="pause-timer"
              title="pause timer"
              onClick={doPause}
            />
            <span className="timer">{timer}</span>
          </span>
          <span className="created">{createTime}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          aria-label="icon-edit"
          title="editing task"
          onClick={onEditing}
        />
        <button
          type="button"
          className="icon icon-destroy"
          aria-label="icon-destroy"
          title="destroy task"
          onClick={onDeleted}
        />
      </div>
      <label htmlFor="edit" className="editLabel">
        <input
          type="text"
          id="edit"
          className="edit"
          onChange={(e) => setEditingTask(e.target.value)}
          onKeyDown={onSubmit}
          value={editingTask}
          ref={inputRef}
        />
      </label>
    </li>
  )
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
export default Task
