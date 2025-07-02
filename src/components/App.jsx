import React, { useState } from 'react';
import InputArea from './InputArea.jsx';
import Task from './Tasks.jsx';
import Filter from './Filter.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  function addTask(inputText) {
    const trimmedText = inputText?.trim();
    if (trimmedText) {
      setTasks((prevValue) => {
        return [...prevValue, trimmedText];
      });
      setAllTasks((prevValue) => {
        return [...prevValue, trimmedText];
      });
    }
  }
  function deleteButtonClickHandler(id) {
    setTasks((prevValue) => {
      return prevValue.filter((task, index) => {
        return id !== index;
      });
    });
    setAllTasks((prevValue) => {
      return prevValue.filter((task, index) => {
        return id !== index;
      });
    });
  }
  function filterTask(filteredTask) {
    const trimmed = filteredTask?.trim().toLowerCase();
    if (trimmed) {
      setTasks(allTasks.filter((task) => task.toLowerCase().includes(trimmed)));
    }
  }

  function clearFilter() {
    setTasks(allTasks);
  }
  return (
    <div>
      <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-blue-900 dark:text-blue-900 text-center">
        Task Manager
      </h1>
      <InputArea onClick={addTask} />
      <Filter onClickSearch={filterTask} onClickClear={clearFilter} />
      {tasks.map((t, index) => {
        return (
          <Task
            key={index}
            id={index}
            text={t}
            onClickDelete={deleteButtonClickHandler}
          />
        );
      })}
    </div>
  );
}

export default App;
