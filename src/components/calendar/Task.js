import React, { useState, useEffect } from 'react';

export default function Task({ value, onChange, onComplete, isCompleted }) {
  const [text, setText] = useState(value);
  const [textDecoration, setTextDecoration] = useState(isCompleted ? 'line-through' : 'none');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTextDecoration(isCompleted ? 'line-through' : 'none');
  }, [isCompleted]);

  const handleOnChange = (event) => {
    onChange(event.target.value.split(","));
    setText(event.target.value);
  };

  const handleOnBlur = () => {
    onChange(text);
  };

  function checkboxOnClick() {
    onComplete(!isCompleted);
  }

  function handleOnMouseEnter(e) {
    setHovered(true);
  }

  function handleOnMouseLeave() {
    setHovered(false);
  }

  return (
    <div className="relative flex" 
         onMouseEnter={handleOnMouseEnter}
         onMouseLeave={handleOnMouseLeave}>
      <input
        type="text"
        value={value}
        style={{
          textDecoration: textDecoration,
        }}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        className={`border-b-2 focus:outline-none focus:border-2 border-gray-300 text-slate-600 px-2 
            py-1 mt-2 w-full rounded-sm hover:border-b-indigo-800 space-y-2 hover:border-b-2
            focus:shadow-lg`}
      />
      {hovered && value !== ' ' && (
        <button>
          <img
            src="./images/check-box.png"
            alt="checkbox"
            className="absolute right-1 top-3 h-4 w-4 cursor-pointer"
            style={{
              filter: isCompleted ? 'grayscale(1)' : 'none',
            }}
            onClick={checkboxOnClick}
          />
        </button>
      )}
    </div>
  );
}
