import React from 'react';
import './input.scss';

const input = (props) => {
  let inputEl;

  switch (props.elType) {
    case 'input':
      inputEl = <input {...props.elConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'textarea':
      inputEl = <textarea {...props.elConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'select':
      inputEl = (
        <select {...props.elConfig} value={props.value} onChange={props.changed} >
          {props.elConfig.options.map(op => (
            <option key={op.value} value={op.value}>{op.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = <input {...props.elConfig} value={props.value} onChange={props.changed} />;
  }

  return (
    <div className="input">
      <label>{props.label}</label>
      {inputEl}
    </div>
  );
}

export default input;