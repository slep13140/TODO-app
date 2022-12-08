import React, { useState } from 'react'

import './NewTaskForm.css'

function NewTaskForm(props) {
  const [labelTask, setLabelTask] = useState('')
  const [timerMin, setTimerMin] = useState('')
  const [timerSec, setTimerSec] = useState('')

  const { onTaskAdded } = props

  const onSubmit = (e) => {
    if (e.code === 'Enter') {
      if (!timerMin && !timerSec) {
        return
      }
      if (labelTask.length === 0 || labelTask.trim().length === 0) {
        return
      }

      onTaskAdded(labelTask, timerMin, timerSec)
      setLabelTask('')
      setTimerMin('')
      setTimerSec('')
    }
  }

  return (
    <form className="new-todo-form">
      <label htmlFor="task">
        <input
          className="new-todo"
          placeholder="Task"
          onChange={(e) => setLabelTask(e.target.value)}
          onKeyDown={onSubmit}
          value={labelTask}
        />
      </label>
      <label htmlFor="min">
        <input
          className="new-todo-form__timer timerMin"
          placeholder="Min"
          onChange={(e) => {
            if (Number(e.target.value)) {
              setTimerMin(e.target.value)
            }
          }}
          onKeyDown={onSubmit}
          value={timerMin}
        />
      </label>
      <label htmlFor="sec">
        <input
          className="new-todo-form__timer timerSec"
          placeholder="Sec"
          onChange={(e) => {
            if (Number(e.target.value)) {
              setTimerSec(e.target.value)
            }
          }}
          onKeyDown={onSubmit}
          value={timerSec}
        />
      </label>
    </form>
  )
}

export default NewTaskForm
