import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [usernameEntered, setUsernameEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  // const [usernameList, setUsernameList] = useState([]);
  // const [passwordList, setPasswordList] = useState([]);
  const BACKEND_URL = 'https://task-manager-backend-cm4y.onrender.com';
  const navigate = useNavigate();
  function usernameChangeHandler(event) {
    const res = event.target.value;
    setUsernameEntered(res);
  }
  function passwordChangeHandler(event) {
    const res = event.target.value;
    setPasswordEntered(res);
  }
  async function loginClickHandler() {
    try {
      const res = await fetch(`${BACKEND_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameEntered,
          password: passwordEntered,
        }),
      });
      const data = await res.json();
      // const userId = data.user.id;
      console.log(data);
      console.log(data.user);

      if (res.status === 200 && data.user) {
        localStorage.setItem('user_id', data.user.id);
        navigate('/tasks');
      } else if (res.status === 401) {
        toast('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error adding user', error);
      toast.error("User couldn't be logged in");
    }
  }
  return (
    <div className="flex flex-row min-h-screen ">
      <div className="flex items-center bg-blue-50 w-1/3 ">
        <h1 className="align-self-center font-serif pl-16  my-4 text-4xl font-bold leading-none tracking-tight text-blue-900 dark:text-blue-900 text-center">
          Task Manager
        </h1>
      </div>
      <div className="flex flex-col p-16 w-2/3 items-center">
        <h1 className=" my-4 text-4xl font-extrabold leading-none tracking-tight text-blue-900 dark:text-blue-900">
          Welcome, please sign in
        </h1>
        <div className=" w-1/2">
          <h1 className="my-4 font-bold text-blue-900 dark:text-blue-900 ">
            Username
          </h1>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg"
            type="text"
            placeholder="Enter Username"
            onChange={usernameChangeHandler}
          />
        </div>
        <div className="w-1/2">
          <h1 className="my-4 font-bold text-blue-900 dark:text-blue-900 ">
            Password
          </h1>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg  "
            type="password"
            placeholder="Enter Password"
            onChange={passwordChangeHandler}
          />
        </div>
        <div className="flex flex-col w-1/2 pt-8 justify-between">
          <button
            className="text-white bg-blue-900 hover:bg-blue-950  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={loginClickHandler}
          >
            Login
          </button>
          <a
            className="pt-4 text-blue-900 underline hover:no-underline font-medium"
            href="/register"
          >
            Not a user? Register here
          </a>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
export default Login;
