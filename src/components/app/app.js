import React, { Component } from 'react'

import TaskList from '../task-list/task-list'
import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'

import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.maxId = 10
    this.state = {
      todoData: [this.createNewTask('fw'), this.createNewTask('fw'), this.createNewTask('fw')],
      filtersData: [
        { selected: true, value: 'All', id: 1 },
        { selected: false, value: 'Active', id: 2 },
        { selected: false, value: 'Completed', id: 3 },
      ],
      currentDate: new Date(),
    }
    this.addTask = (text) => {
      const newTask = this.createNewTask(text)
      this.setState(({ todoData }) => {
        const newArray = [...todoData, newTask]
        return {
          todoData: newArray,
        }
      })
    }
    this.deleteTask = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
        return {
          todoData: newArr,
        }
      })
    }
    this.onToggleCompleted = (id) => {
      this.setState(({ todoData, filtersData }) => {
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
        return {
          todoData: newArr,
        }
      })
    }
    this.onToggleSelected = (id) => {
      this.setState(({ filtersData }) => {
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
        return {
          filtersData: newArr,
        }
      })
    }
    this.onFilterCompleted = (value) => {
      if (value === 'Active') {
        this.setState(({ todoData }) => {
          const newArr = JSON.parse(JSON.stringify(todoData)).map((index) => {
            const item = { ...index }
            item.createdDate = new Date(item.createdDate)
            if (item.checked) {
              item.filterCompleted = true
            } else {
              item.filterCompleted = false
            }
            return item
          })

          return {
            todoData: newArr,
          }
        })
      } else if (value === 'Completed') {
        this.setState(({ todoData }) => {
          const newArr = JSON.parse(JSON.stringify(todoData)).map((item) => {
            const result = { ...item }
            result.createdDate = new Date(item.createdDate)
            if (!item.checked) {
              result.filterCompleted = true
            } else {
              result.filterCompleted = false
            }
            return result
          })
          return {
            todoData: newArr,
          }
        })
      } else if (value === 'All') {
        this.setState(({ todoData }) => {
          const newArr = JSON.parse(JSON.stringify(todoData)).map((item) => {
            const result = { ...item }
            result.createdDate = new Date(item.createdDate)
            result.filterCompleted = false
            return result
          })
          return {
            todoData: newArr,
          }
        })
      }
    }
    this.onClearCompleted = () => {
      this.setState(({ todoData }) => {
        const newArr = JSON.parse(JSON.stringify(todoData)).filter((el) => !el.completed)
        return {
          todoData: newArr.map((index) => {
            const item = { ...index }
            item.createdDate = new Date(item.createdDate)
            return item
          }),
        }
      })
    }
    this.doTimer = (id, time) => {
      this.setState(({ todoData, currentDate }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const oldStart = oldItem.startPlay

        const newItem = {
          ...oldItem,
          startOn: true,
          pauseOn: false,
        }
        if (!oldItem.startOn && oldItem.pauseTimer === 0) {
          newItem.startPlay = time
        } else {
          newItem.startPlay = oldStart
        }

        if (newItem.startOn) {
          this.taskTimer()
        }
        if (newItem.pauseTimer > 0 && oldItem.pauseOn) {
          newItem.startPlay = currentDate - oldItem.pauseTimer
        }

        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

        return {
          todoData: newArr,
        }
      })
    }
    this.doPause = (id) => {
      this.setState(({ todoData, currentDate }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newPauseOn = !oldItem.pauseOn
        const newTimer = currentDate - oldItem.startPlay
        let newItem
        if (newPauseOn && oldItem.startOn) {
          newItem = {
            ...oldItem,
            startOn: false,
            pauseOn: newPauseOn,
            pauseTimer: newTimer,
          }
        } else if (newPauseOn && !oldItem.startOn) {
          newItem = { ...oldItem }
        } else {
          newItem = {
            ...oldItem,
            startPlay: currentDate - oldItem.pauseTimer,
            startOn: true,
            pauseOn: newPauseOn,
          }
        }
        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArr,
        }
      })
    }
    this.checkTime = (i) => {
      let t = i
      if (i < 10) {
        t = `0${i}`
      }
      return t
    }
    this.taskUpdate = this.taskUpdate.bind(this)
  }

  componentDidMount() {
    const { timeInterval } = this.props
    this.timerID = setInterval(() => this.tick(), timeInterval)
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentDate: newResult } = this.state
    const { currentDate: oldResult } = prevState
    if (newResult !== oldResult) {
      this.taskUpdate()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    clearInterval(this.taskTimerID)
  }

  createNewTask(description) {
    const date = new Date()
    let taskId = this.maxId
    taskId += 1
    this.maxId = taskId

    return {
      description,
      completed: false,
      checked: false,
      filterCompleted: false,
      createdDate: date,
      id: taskId,
      timer: '00:00',
      startPlay: date,
      startOn: false,
      pauseOn: false,
      pauseTimer: 0,
    }
  }

  tick() {
    this.setState({ currentDate: new Date() })
  }

  taskTimer() {
    this.taskTimerID = setInterval(() => this.tick(), 1000)
  }

  taskUpdate() {
    this.setState(({ todoData, currentDate }) => {
      const newArr = JSON.parse(JSON.stringify(todoData)).map((index) => {
        const item = { ...index }
        item.createdDate = new Date(item.createdDate)
        if (item.startOn) {
          const totalSeconds = Math.floor((currentDate - new Date(item.startPlay)) / 1000)
          const seconds = totalSeconds % 60
          const totalMinutes = Math.floor(totalSeconds / 60)
          const minutes = totalMinutes % 60
          item.timer = `${this.checkTime(minutes)}:${this.checkTime(seconds)}`
        }

        return item
      })

      return {
        todoData: newArr,
      }
    })
  }

  render() {
    const { todoData, filtersData } = this.state
    const activeCount = todoData.length - todoData.filter((el) => el.completed).length
    const { currentDate: created } = this.state

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            currentDate={created}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            doTimer={this.doTimer}
            doPause={this.doPause}
          />
          <Footer
            toDo={activeCount}
            filters={filtersData}
            onToggleSelected={this.onToggleSelected}
            onFilterCompleted={this.onFilterCompleted}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}

App.defaultProps = {
  timeInterval: 30000,
}
