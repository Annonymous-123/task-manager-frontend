import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function Filter(props) {
  const [filteredTask, setFilteredTask] = useState('');
  function filterInputChange(event) {
    setFilteredTask(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="flex justify-end px-4 mt-4">
      <div className="flex justify-end items-center gap-2 w-half max-w-md">
        <div className="relative w-full max-x-xs">
          <input
            onChange={filterInputChange}
            type="text"
            placeholder="Search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-1/5 p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-sm rounded-lg w-full p-2 pr-10 border border-grey-300 rounded-md "
            value={filteredTask}
          />
          {filteredTask ? (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-grey-500 hover:text-black"
              onClick={() => {
                setFilteredTask('');
                props.onClickClear();
              }}
            >
              <ClearIcon />
            </button>
          ) : null}
        </div>
        <button
          onClick={() => {
            props.onClickSearch(filteredTask);
          }}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default Filter;
