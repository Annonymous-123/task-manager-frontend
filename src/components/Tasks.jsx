import React from 'react';
import { useState } from 'react';

function Task(props) {
  const [check, setCheck] = useState(props.status);

  function onCheck() {
    const newCheck = !check;
    setCheck(newCheck);
    props.onClickCheck(props.id, newCheck);
  }

  return (
    <div className="grid gap-6 my-6 md:grid-cols-1">
      <ul>
        <li className="bg-white shadow p-3 rounded border-l-4 border-blue-900 flex items-center justify-between mx-8">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              className="accent-blue-900 w-5 h-5"
              checked={check}
              onChange={onCheck}
            />

            <span className={check ? 'line-through text-gray-500' : ''}>
              {props.text}
            </span>
          </div>
          {/* <input type="date" /> */}
          <button
            className="text-white bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              props.onClickDelete(props.id);
            }}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Task;
