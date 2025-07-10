import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import InputArea from './InputArea.jsx';
import Task from './Tasks.jsx';
import Filter from './Filter.jsx';

const BACKEND_URL = 'https://task-manager-backend-cm4y.onrender.com';
function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  async function fetchTasksFromBackend() {
    try {
      const userId = localStorage.getItem('user_id');
      const res = await fetch(`${BACKEND_URL}/tasks/?user_id=${userId}`);
      const data = await res.json();
      setAllTasks(data);
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  }
  useEffect(() => {
    fetchTasksFromBackend();
  }, []);

  async function addTask(inputText) {
    const userId = localStorage.getItem('user_id');
    const trimmedText = inputText?.trim();
    if (!trimmedText) return;
    try {
      const res = await fetch(`${BACKEND_URL}/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: trimmedText, user_id: userId }),
      });

      if (!res.ok) throw new Error('Failed to add new task');
      const newTask = await res.json();

      setTasks((prevValue) => {
        return [...prevValue, newTask];
      });
      setAllTasks((prevValue) => {
        return [...prevValue, newTask];
      });
      toast('Task Added');
    } catch (err) {
      console.error('Error adding task', err);
      toast.error("Task couldn't be added");
    }
  }
  async function deleteButtonClickHandler(id) {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prevValue) => prevValue.filter((task) => id !== task.id));
      setAllTasks((prevValue) => prevValue.filter((task) => id !== task.id));
      toast('Task Deleted');
    } catch (err) {
      console.error('Error deleting task', err);
      const updatedTasks = await fetchTasksFromBackend();
      setTasks(updatedTasks);
      setAllTasks(updatedTasks);
      toast.error("Task couldn't be deleted");
    }
  }
  async function updateDbOnCheck(id, check) {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ check }),
      });
    } catch (err) {
      console.error('Error updating task', err);
    }
  }
  function filterTask(filteredTask) {
    const trimmed = filteredTask?.trim().toLowerCase();
    if (trimmed) {
      setTasks(
        allTasks.filter((task) => task.task.toLowerCase().includes(trimmed))
      );
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
            key={t.id}
            id={t.id}
            text={t.task}
            status={t.completed}
            onClickDelete={deleteButtonClickHandler}
            onClickCheck={updateDbOnCheck}
          />
        );
      })}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default HomePage;
