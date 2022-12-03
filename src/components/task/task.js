import React from 'react'
import PropTypes from 'prop-types'

import './task.css'

function Task(props) {
  const { completed, filterCompleted, checked } = props
  const { onToggleCompleted, keyId, description } = props
  const { created, onDeleted } = props
  const { doTimer, doPause, timer } = props
  const keyLabel = `${keyId} + 'Id'`
  const createTime = `created ${created} ago`

  let classNames = ''
  if (completed) {
    classNames += 'completed'
  }
  if (filterCompleted && completed) {
    classNames += ' filterCompleted'
  } else if (filterCompleted && !completed) {
    classNames += 'filterCompleted'
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
        <button type="button" className="icon icon-edit" aria-label="icon-edit" />
        <button type="button" className="icon icon-destroy" aria-label="icon-destroy" onClick={onDeleted} />
      </div>
      <input type="text" className="edit" defaultValue="Editing task" />
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
  timer: PropTypes.string.isRequired,
}
export default Task
