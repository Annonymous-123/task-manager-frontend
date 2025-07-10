import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [usernameEntered, setUsernameEntered] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [passwordChecker, setPasswordChecker] = useState(true);
  // const [usernameList, setUsernameList] = useState([]);
  // const [passwordList, setPasswordList] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL = 'https://task-manager-backend-cm4y.onrender.com';
  function handleUsernameEntered(event) {
    const res = event.target.value;
    setUsernameEntered(res);
  }
  function handlePasswordEntered(event) {
    const res = event.target.value;
    setPasswordEntered(res);
  }
  function passwordConfirmation(event) {
    const res = event.target.value;
    setPasswordConfirmed(res);
  }

  async function registerClickHandler() {
    if (passwordEntered !== passwordConfirmed) {
      setPasswordChecker(false);
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameEntered,
          password: passwordEntered,
        }),
      });
      if (res.status === 201) {
        setPasswordChecker(true);
        toast('User registered successfully. Please log in');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (res.status === 409) {
        toast('User already registered. Redirecting to log in...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Error adding user', err);
      toast.error("User couldn't be registered");
    }
  }
  return (
    <div className="flex justify-center pt-16 min-h-screen  ">
      <div className="flex flex-col w-1/3">
        <h1 className="my-4 font-bold text-blue-900 dark:text-blue-900 ">
          Username
        </h1>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg"
          type="text"
          placeholder="Enter Username"
          onChange={handleUsernameEntered}
        />

        <h1 className="my-4 font-bold text-blue-900 dark:text-blue-900 ">
          Password
        </h1>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg  "
          type="password"
          placeholder="Enter Password"
          onChange={handlePasswordEntered}
        />
        <h1 className="my-4 font-bold text-blue-900 dark:text-blue-900 ">
          Confirm Password
        </h1>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg  "
          type="password"
          placeholder="Enter Password"
          onChange={passwordConfirmation}
        />
        <button
          className="mt-8 text-white bg-blue-900 hover:bg-blue-950  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={registerClickHandler}
        >
          Register
        </button>
        {!passwordChecker ? (
          <p className="text-red-600 pt-2">Passwords do not match</p>
        ) : (
          ''
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}
export default Register;
