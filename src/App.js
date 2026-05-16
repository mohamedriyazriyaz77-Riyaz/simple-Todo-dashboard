import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    todos: [
      { id: 1, title: 'Buy groceries', completed: false, editing: false },
      { id: 2, title: 'Walk the dog', completed: false, editing: false },
    ],
    inputValue: '',
    nextId: 3,
  }

  onChangeInput = e => {
    this.setState({ inputValue: e.target.value })
  }

  onKeyDownInput = e => {
    if (e.key === 'Enter') this.onClickAdd()
  }

  onClickAdd = () => {
    const { inputValue, todos, nextId } = this.state
    const raw = inputValue.trim()
    if (!raw) return
    const parts = raw.split(' ')
    const last = parts[parts.length - 1]
    const count = parseInt(last, 10)
    let newTodos = []
    if (parts.length > 1 && !isNaN(count) && count > 0 && String(count) === last) {
      const title = parts.slice(0, parts.length - 1).join(' ')
      for (let i = 0; i < count; i++) {
        newTodos.push({ id: nextId + i, title, completed: false, editing: false })
      }
      this.setState({ todos: [...todos, ...newTodos], inputValue: '', nextId: nextId + count })
    } else {
      newTodos = [{ id: nextId, title: raw, completed: false, editing: false }]
      this.setState({ todos: [...todos, ...newTodos], inputValue: '', nextId: nextId + 1 })
    }
  }

  onClickDelete = id => {
    this.setState(prev => ({ todos: prev.todos.filter(t => t.id !== id) }))
  }

  onToggleComplete = id => {
    this.setState(prev => ({
      todos: prev.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
    }))
  }

  onClickEdit = id => {
    this.setState(prev => ({
      todos: prev.todos.map(t => ({ ...t, editing: t.id === id })),
    }))
  }

  onChangeEditInput = (e, id) => {
    const val = e.target.value
    this.setState(prev => ({
      todos: prev.todos.map(t => t.id === id ? { ...t, title: val } : t),
    }))
  }

  onClickSave = id => {
    this.setState(prev => ({
      todos: prev.todos.map(t => t.id === id ? { ...t, editing: false } : t),
    }))
  }

  onKeyDownEdit = (e, id) => {
    if (e.key === 'Enter') this.onClickSave(id)
  }

  render() {
    const { todos, inputValue } = this.state
    const completed = todos.filter(t => t.completed).length
    return (
      <div className="app-container">
        <div className="todo-card">
          <h1 className="app-heading">Simple Todos</h1>
          <div className="add-row">
            <input
              className="todo-input"
              type="text"
              value={inputValue}
              onChange={this.onChangeInput}
              onKeyDown={this.onKeyDownInput}
              placeholder="Add todo… or 'Buy milk 3' for multiple"
            />
            <button className="btn-add" onClick={this.onClickAdd}>Add</button>
          </div>
          <hr className="divider" />
          {todos.length === 0 && <p className="empty-state">No todos yet!</p>}
          <ul className="todo-list">
            {todos.map(todo => (
              <li className="todo-item" key={todo.id}>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => this.onToggleComplete(todo.id)}
                />
                {todo.editing ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={todo.title}
                    onChange={e => this.onChangeEditInput(e, todo.id)}
                    onKeyDown={e => this.onKeyDownEdit(e, todo.id)}
                    autoFocus
                  />
                ) : (
                  <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                )}
                {todo.editing ? (
                  <button className="btn-save" onClick={() => this.onClickSave(todo.id)}>Save</button>
                ) : (
                  <button className="btn-edit" onClick={() => this.onClickEdit(todo.id)}>Edit</button>
                )}
                <button className="btn-delete" onClick={() => this.onClickDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {todos.length > 0 && (
            <p className="stats"><strong>{completed}</strong> of <strong>{todos.length}</strong> completed</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
