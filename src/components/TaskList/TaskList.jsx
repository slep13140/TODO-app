import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Task from '../Task/Task'

import './TaskList.css'

function TaskList(props) {
  const { todos, onDeleted, onEditing } = props
  const { onToggleCompleted, currentDate } = props
  const { doTimer, doPause, onNewTask } = props

  const elements = todos.map((item) => {
    const { id, createdDate, description } = item
    const { completed, filterCompleted, checked } = item
    const { timerMin, timerSec, editing } = item
    const created = formatDistanceToNow(createdDate, currentDate)

    return (
      <Task
        description={description}
        completed={completed}
        filterCompleted={filterCompleted}
        created={created}
        checked={checked}
        keyId={id}
        key={id}
        timerMin={timerMin}
        timerSec={timerSec}
        editing={editing}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        doTimer={() => doTimer(id)}
        doPause={() => doPause(id)}
        onEditing={() => onEditing(id)}
        onNewTask={onNewTask}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  currentDate: new Date(),
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date),
  doTimer: PropTypes.func.isRequired,
  doPause: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  onNewTask: PropTypes.func.isRequired,
}
export default TaskList
