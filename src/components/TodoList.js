import React, {useState} from 'react'
import TodoForm from './Todoform'

function TodoList() {
    const [todos, setTodos] = useState([])

    return (
        <div>
            <h1>Plan for today!</h1>
        </div>
    )
}

export default TodoList
