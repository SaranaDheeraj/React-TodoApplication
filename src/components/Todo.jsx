import React from "react";

const Todo = ({ todo, removeTodo, changeChecked, checked }) => {
  return (
    <div className="flex  justify-between align-middle border-solid border-2 border-indigo-500 mx-4 my-2 p-2 rounded-lg bg-slate-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => changeChecked()}
      />

      <span className="flex-grow ml-2  p-1 text-lg font-bold">{todo}</span>
      {checked && (
        <button className="h-full w-6 text-lg" onClick={removeTodo}>
          <span className="text-center pb-3">x</span>
        </button>
      )}
    </div>
  );
};

export default Todo;
