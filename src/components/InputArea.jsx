import React, { useState } from 'react';

function InputArea(props) {
  const [inputText, setInputText] = useState('');
  function changeHandler(event) {
    setInputText(event.target.value);
  }
  function addTask() {
    props.onClick(inputText);
    
      setInputText('');
    
  }
  return (
    <div className="w-full flex justify-center items-center gap-2">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-2/3 p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg  "
        onChange={changeHandler}
        type="text"
        value={inputText}
        placeholder="Add task"
      />
      <button
        className="text-white bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={addTask}
      >
        {' '}
        <span>Add</span>
      </button>
    </div>
  );
}
export default InputArea;
