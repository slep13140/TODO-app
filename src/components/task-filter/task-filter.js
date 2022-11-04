import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

function TaskFilter({ selected, value, onToggleSelected }) {
  let classNames = ''
  if (selected) {
    classNames += 'selected'
  }

  return (
    <li>
      <button type="button" className={classNames} onClick={onToggleSelected}>
        {value}
      </button>
    </li>
  )
}

TaskFilter.defaultProps = {
  selected: false,
}
TaskFilter.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onToggleSelected: PropTypes.func.isRequired,
}
export default TaskFilter
