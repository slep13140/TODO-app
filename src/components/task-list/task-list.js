import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Task from '../task/task'

import './task-list.css'

function TaskList(props) {
  const { todos, onDeleted } = props
  const { onToggleCompleted, currentDate } = props

  const elements = todos.map((item) => {
    const { id, createdDate, description } = item
    const { completed, filterCompleted, checked } = item
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
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
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
}
export default TaskList
