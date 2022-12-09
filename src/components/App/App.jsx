import React, { useState, useEffect, useRef } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

import './App.css'

function App() {
  const [maxId, setMaxId] = useState(14)
  let maxId1 = 10
  const createNewTask = (description) => {
    const date = new Date()
    let taskId = maxId1
    taskId += 1
    maxId1 = taskId
    return {
      description,
      completed: false,
      checked: false,
      filterCompleted: false,
      createdDate: date,
      id: taskId,
      editing: false,
      timerMin: '00',
      timerSec: '00',
      startOn: false,
      pauseOn: false,
    }
  }
  const [todoData, setTodoData] = useState([createNewTask('fw'), createNewTask('fw'), createNewTask('fw')])
  const [filtersData, setFiltersData] = useState([
    { selected: true, value: 'All', id: 1 },
    { selected: false, value: 'Active', id: 2 },
    { selected: false, value: 'Completed', id: 3 },
  ])
  const [currentDate, setCurrentDate] = useState(new Date())

  const checkTime = (i) => {
    let t = i
    if (i < 10) {
      t = `0${i}`
    }
    return t
  }

  const addTask = (text, min, sec) => {
    let timeMin = 0
    let timeSec = 0
    if (sec) {
      timeSec = sec % 60
      timeMin = Math.floor(sec / 60)
    }
    if (min) {
      timeMin += +min
    }
    const newTask = createNewTask(text)
    if (timeMin > 0) {
      newTask.timerMin = checkTime(timeMin)
    }
    if (timeSec > 0) {
      newTask.timerSec = checkTime(timeSec)
    }
    newTask.id = maxId
    setMaxId((s) => s + 1)
    const newArray = [...todoData, newTask]
    setTodoData(newArray)
  }

  const deleteTask = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const onToggleCompleted = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = {
      ...oldItem,
      completed: !oldItem.completed,
      checked: !oldItem.checked,
      startOn: false,
    }
    if (filtersData[1].selected === true) {
      newItem.filterCompleted = true
    }
    if (filtersData[2].selected === true) {
      newItem.filterCompleted = true
    }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const onToggleSelected = (id) => {
    const idx = filtersData.findIndex((el) => el.id === id)
    const newArr = JSON.parse(JSON.stringify(filtersData)).map((item) => {
      const result = { ...item }
      if (result.value !== filtersData[idx].value) {
        result.selected = false
      } else if (filtersData[idx].selected === true) {
        result.selected = true
      } else {
        result.selected = !item.selected
      }
      return result
    })
    setFiltersData(newArr)
  }

  const onFilterCompleted = (value) => {
    const newArr = JSON.parse(JSON.stringify(todoData)).map((index) => {
      const item = { ...index }
      item.createdDate = new Date(item.createdDate)
      if (value === 'Active') {
        if (item.checked) {
          item.filterCompleted = true
        } else {
          item.filterCompleted = false
        }
      }
      if (value === 'Completed') {
        if (!item.checked) {
          item.filterCompleted = true
        } else {
          item.filterCompleted = false
        }
      }
      if (value === 'All') {
        item.filterCompleted = false
      }
      return item
    })
    setTodoData(newArr)
  }

  const onClearCompleted = () => {
    const newArr = JSON.parse(JSON.stringify(todoData))
      .filter((el) => !el.completed)
      .map((index) => {
        const item = { ...index }
        item.createdDate = new Date(item.createdDate)
        return item
      })
    setTodoData(newArr)
  }

  const onEditing = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = {
      ...oldItem,
      editing: true,
    }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const onNewTask = (id, text) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = {
      ...oldItem,
      description: text,
      editing: false,
    }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const doTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = {
      ...oldItem,
      startOn: true,
      pauseOn: false,
    }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const doPause = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newPauseOn = !oldItem.pauseOn
    let newItem
    if (newPauseOn && oldItem.startOn) {
      newItem = {
        ...oldItem,
        startOn: false,
        pauseOn: newPauseOn,
      }
    } else if (newPauseOn && !oldItem.startOn) {
      newItem = { ...oldItem }
    } else {
      newItem = {
        ...oldItem,
        startOn: true,
        pauseOn: newPauseOn,
      }
    }
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const taskUpdate = () => {
    const newArr = JSON.parse(JSON.stringify(todoData)).map((index) => {
      let totalTime = 0
      const item = { ...index }
      item.createdDate = new Date(item.createdDate)
      if (typeof item.timerMin === 'number') {
        totalTime += item.timerMin * 60
      } else if (typeof item.timerMin === 'string') {
        totalTime += Number(item.timerMin) * 60
      }
      if (typeof item.timerSec === 'number') {
        totalTime += item.timerSec
      } else if (typeof item.timerSec === 'string') {
        totalTime += Number(item.timerSec)
      }
      if (item.startOn && totalTime > 0) {
        totalTime -= 1
        item.timerSec = checkTime(totalTime % 60)
        item.timerMin = checkTime(Math.floor(totalTime / 60))
      } else if (totalTime === 0) {
        item.startOn = false
      }
      return item
    })
    setTodoData(newArr)
  }
  const activeCount = todoData.length - todoData.filter((el) => el.completed).length
  const useInterval = (callback) => {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    })

    useEffect(() => {
      function tick() {
        savedCallback.current()
        setCurrentDate(new Date())
      }
      const id = setInterval(tick, 1000)
      return () => clearInterval(id)
    }, [])
  }
  useInterval(() => {
    taskUpdate()
  }, 1000)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          currentDate={currentDate}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          doTimer={doTimer}
          doPause={doPause}
          onEditing={onEditing}
          onNewTask={onNewTask}
        />
        <Footer
          toDo={activeCount}
          filters={filtersData}
          onToggleSelected={onToggleSelected}
          onFilterCompleted={onFilterCompleted}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  )
}

export default App
