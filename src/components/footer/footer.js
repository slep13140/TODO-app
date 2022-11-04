import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter/task-filter'

import './footer.css'

function Footer(props) {
  const { filters, onToggleSelected, toDo } = props
  const { onFilterCompleted, onClearCompleted } = props
  const leftItems = `${toDo} items left`
  const elements = filters.map((item) => {
    const { id, value, selected } = item

    return (
      <TaskFilter
        key={id}
        value={value}
        selected={selected}
        onToggleSelected={() => {
          onToggleSelected(id)
          onFilterCompleted(value)
        }}
      />
    )
  })

  return (
    <footer className="footer">
      <span className="todo-count">{leftItems}</span>
      <ul className="filters">{elements}</ul>
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onToggleSelected: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  toDo: PropTypes.number.isRequired,
}
export default Footer
