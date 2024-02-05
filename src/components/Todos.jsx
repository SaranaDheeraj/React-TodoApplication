import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const getInitialTodos = () => {
  try {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
      return [];
    }
    return todos;
  } catch (e) {
    return [];
  }
};

const getInitialChecked = () => {
  try {
    const checked = JSON.parse(localStorage.getItem("checked"));
    if (!checked) return undefined;

    return checked;
  } catch (error) {
    return undefined;
  }
};

const Todos = () => {
  const [todos, setTodos] = useState(getInitialTodos());
  const [addTodo, setAddTodo] = useState("");
  const [checked, setChecked] = useState(
    getInitialChecked() || new Array(todos.length).fill(false)
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [todos, checked]);

  const handleChange = (e) => {
    setAddTodo((addTodo) => e.target.value);
  };

  const addToList = () => {
    setTodos((oldtodos) => [...todos, addTodo]);
    setChecked([...checked, false]);
    setAddTodo("");
  };

  const removeTodo = (id) => {
    setTodos((oldtodos) => oldtodos.filter((todo, i) => i != id));
    setChecked((oldChecked) => oldChecked.filter((_, i) => i != id));
  };

  const changeChecked = (id) => {
    setChecked((oldChecked) =>
      oldChecked.map((check, i) => {
        if (i === id) {
          return !check;
        } else {
          return check;
        }
      })
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-5xl font-bold text-purple-600 mb-4">Thing to Do!</h1>

      <div className="flex  justify-between w-2/5">
        <input
          type="text"
          placeholder="addTodo"
          className="flex-grow w-3/5 h-14 mx-4 my-2 px-3 py-2 font-semibold placeholder-gray-500  rounded-2xl border-none ring-2 ring-purple-500 focus:ring-purple-800 focus:ring-2"
          value={addTodo}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="text-xl p-3 bg-purple-300 rounded-xl mr-4"
          onClick={addToList}
        >
          Add
        </button>
      </div>
      <div className="w-2/5">
        {todos.map((todo, i) => (
          <Todo
            key={i}
            todo={todo}
            removeTodo={() => removeTodo(i)}
            changeChecked={() => changeChecked(i)}
            checked={checked[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
