import React from 'react';
import './input.scss';

const input = (props) => {
  let inputEl;

  switch (props.inputtype) {
    case 'input':
      inputEl = <input {...props}/>;
      break;
    case 'textarea':
      inputEl = <textarea {...props}/>;
      break;
    default:
      inputEl = <input {...props}/>;
  }

  return (
    <div className="input">
      <label>{props.label}</label>
      {inputEl}
    </div>
  );
}

export default input;