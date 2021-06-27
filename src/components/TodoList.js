import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import GoogleSheetService from "../services/GoogleSheetService";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //API call to retrieve spread sheet values
    GoogleSheetService.RetrieveTopics().then((values) => {
      // console.log("Topics retrieved: ", JSON.stringify(values))
      for (let value of values) {
        let val = value["Topic"]
        // console.log("Sending request for topic: ", JSON.stringify(value))
        GoogleSheetService.RetrieveSubTopics(val).then((vals) => {

          // console.log("Subtopics retrieved: ", JSON.stringify(values))
          // for (let value in values) {
          //   setTodos(value);  
          // }
          setTodos(vals);
        });
      }
      // setTodos(values);
    });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (value) => {
    if (!value.text || /^\s*$/.test(value.text)) {
      return;
    }

    //TODO: API call to update
    setTodos((prev) =>
      prev.map((item) => (item.id === value.id ? value : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    console.log("Todos - completeTodo: ", JSON.stringify(todos))
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Welcome Heilbronners!</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
