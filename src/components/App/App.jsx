import React, { Component } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

import './App.css'
// import { number } from 'prop-types'

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

    this.addTask = (text, min, sec) => {
      let timeMin = 0
      let timeSec = 0
      if (sec) {
        timeSec = sec % 60
        timeMin = Math.floor(sec / 60)
      }
      if (min) {
        timeMin += +min
      }
      const newTask = this.createNewTask(text)
      if (timeMin > 0) {
        newTask.timerMin = this.checkTime(timeMin)
      }
      if (timeSec > 0) {
        newTask.timerSec = this.checkTime(timeSec)
      }
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

    this.onEditing = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = {
          ...oldItem,
          editing: true,
        }
        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArr,
        }
      })
    }

    this.onNewTask = (id, text) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = {
          ...oldItem,
          description: text,
          editing: false,
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

    this.doTimer = (id) => {
      this.setState(({ todoData, currentDate }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]

        const newItem = {
          ...oldItem,
          startOn: true,
          pauseOn: false,
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
      this.setState(({ todoData }) => {
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
        return {
          todoData: newArr,
        }
      })
    }

    this.taskUpdate = this.taskUpdate.bind(this)
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
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
      editing: false,
      timerMin: '00',
      timerSec: '00',
      startOn: false,
      pauseOn: false,
    }
  }

  tick() {
    this.setState({ currentDate: new Date() })
  }

  taskUpdate() {
    let totalTime = 0
    this.setState(({ todoData }) => {
      const newArr = JSON.parse(JSON.stringify(todoData)).map((index) => {
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
          item.timerSec = this.checkTime(totalTime % 60)
          item.timerMin = this.checkTime(Math.floor(totalTime / 60))
        } else if (totalTime === 0) {
          item.startOn = false
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
            onEditing={this.onEditing}
            onNewTask={this.onNewTask}
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
