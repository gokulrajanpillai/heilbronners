import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: 0,
    value: "",
  });

  const submitUpdate = (value) => {
    value.id = edit.id;
    updateTodo(value);
    setEdit({
      id: 0,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  console.log("Todos: ", JSON.stringify(todos))
  todos.map((todo, index) => (
    console.log("topic: ", todo)
  ));
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.ID} onClick={() => completeTodo(todo.ID)}>
        {todo.Topic}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.ID)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.ID, value: todo.Topic })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
