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
      todoData: [
        this.createNewTask('Completed task'),
        this.createNewTask('Editing task'),
        this.createNewTask('Active task'),
      ],
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
  }

  componentDidMount() {
    const { timeInterval } = this.props
    this.timerID = setInterval(() => this.tick(), timeInterval)
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
    }
  }

  tick() {
    this.setState({ currentDate: new Date() })
  }

  render() {
    const { todoData, filtersData } = this.state
    const activeCount = todoData.length - todoData.filter((el) => el.completed).length
    const { currentDate: created } = this.state
    // const created = this.state.currentDate

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
