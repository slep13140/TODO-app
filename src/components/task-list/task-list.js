import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Task from '../task/task'

import './task-list.css'

function TaskList(props) {
  const { todos, onDeleted } = props
  const { onToggleCompleted, currentDate } = props
  const { doTimer, doPause } = props

  const elements = todos.map((item) => {
    const { id, createdDate, description } = item
    const { completed, filterCompleted, checked } = item
    const { timer } = item
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
        timer={timer}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        doTimer={() => {
          const start = Date.now()
          doTimer(id, start)
        }}
        doPause={() => doPause(id)}
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
}
export default TaskList
