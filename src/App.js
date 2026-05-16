import {Component} from 'react'
import './App.css'

const initialTodoList = [
  {id: 1, title: 'Buy the groceries'},
  {id: 2, title: 'Clean the house'},
  {id: 3, title: 'Book the ticket'},
  {id: 4, title: 'Pay the bills'},
  {id: 5, title: 'Go to the gym'},
  {id: 6, title: 'Call the doctor'},
  {id: 7, title: 'Fix the car'},
  {id: 8, title: 'Water the plants'},
]

class App extends Component {
  state = {
    todoList: initialTodoList.map(todo => ({
      ...todo,
      isChecked: false,
      isEditing: false,
    })),
    userInput: '',
    nextId: 9,
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onAddTodo = () => {
    const {userInput, todoList, nextId} = this.state
    const trimmed = userInput.trim()
    if (trimmed === '') return

    const parts = trimmed.split(' ')
    const lastWord = parts[parts.length - 1]
    const count = parseInt(lastWord, 10)

    if (
      parts.length > 1 &&
      !isNaN(count) &&
      count > 0 &&
      String(count) === lastWord
    ) {
      const title = parts.slice(0, parts.length - 1).join(' ')
      const newTodos = []
      for (let i = 0; i < count; i++) {
        newTodos.push({
          id: nextId + i,
          title,
          isChecked: false,
          isEditing: false,
        })
      }
      this.setState({
        todoList: [...todoList, ...newTodos],
        userInput: '',
        nextId: nextId + count,
      })
    } else {
      const newTodo = {
        id: nextId,
        title: trimmed,
        isChecked: false,
        isEditing: false,
      }
      this.setState({
        todoList: [...todoList, newTodo],
        userInput: '',
        nextId: nextId + 1,
      })
    }
  }

  onDeleteTodo = id => {
    const {todoList} = this.state
    const updatedList = todoList.filter(todo => todo.id !== id)
    this.setState({todoList: updatedList})
  }

  onCheckTodo = id => {
    const {todoList} = this.state
    const updatedList = todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, isChecked: !todo.isChecked}
      }
      return todo
    })
    this.setState({todoList: updatedList})
  }

  onClickEdit = id => {
    const {todoList} = this.state
    const updatedList = todoList.map(todo => ({
      ...todo,
      isEditing: todo.id === id,
    }))
    this.setState({todoList: updatedList})
  }

  onChangeTodoTitle = (event, id) => {
    const {todoList} = this.state
    const updatedList = todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, title: event.target.value}
      }
      return todo
    })
    this.setState({todoList: updatedList})
  }

  onClickSave = id => {
    const {todoList} = this.state
    const updatedList = todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, isEditing: false}
      }
      return todo
    })
    this.setState({todoList: updatedList})
  }

  render() {
    const {todoList, userInput} = this.state

    return (
      <div className="app-container">
        <div className="todos-container">
          <h1 className="todos-heading">Simple Todos</h1>
          <div className="input-container">
            <input
              type="text"
              className="todo-user-input"
              value={userInput}
              onChange={this.onChangeUserInput}
              placeholder="What needs to be done?"
            />
            <button
              type="button"
              className="button add-button"
              onClick={this.onAddTodo}
            >
              Add
            </button>
          </div>
          <ul className="todo-items-container">
            {todoList.map(todo => (
              <li key={todo.id} className="todo-item-container">
                <input
                  type="checkbox"
                  id={`checkbox${todo.id}`}
                  className="checkbox-input"
                  checked={todo.isChecked}
                  onChange={() => this.onCheckTodo(todo.id)}
                />
                {todo.isEditing ? (
                  <input
                    type="text"
                    className="todo-user-input"
                    value={todo.title}
                    onChange={event =>
                      this.onChangeTodoTitle(event, todo.id)
                    }
                  />
                ) : (
                  <p
                    className={
                      todo.isChecked ? 'checked todo-label' : 'todo-label'
                    }
                  >
                    {todo.title}
                  </p>
                )}
                {todo.isEditing ? (
                  <button
                    type="button"
                    className="button save-button"
                    onClick={() => this.onClickSave(todo.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button edit-button"
                    onClick={() => this.onClickEdit(todo.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="button delete-button"
                  onClick={() => this.onDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
