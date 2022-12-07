import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

function TaskFilter({ selected, value, onToggleSelected }) {
  let classNames = ''
  if (selected) {
    classNames += 'selected'
  }

  return (
    <li>
      <button type="button" className={classNames} onClick={onToggleSelected} aria-label={value}>
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
