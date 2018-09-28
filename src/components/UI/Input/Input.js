import React from 'react';
import './input.scss';

const input = (props) => {
  let inputEl,
      validationError;
  const inputClass = [];

  if (props.invalid && props.touched) {
    inputClass.push('invalid');
    validationError = <p className="error-message">Please enter a valid {props.label} value!</p>;
  }

  switch (props.elType) {
    case 'input':
      inputEl = <input className={inputClass.join(' ')} {...props.elConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'textarea':
      inputEl = <textarea className={inputClass.join(' ')} {...props.elConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'select':
      inputEl = (
        <select className={inputClass.join(' ')} {...props.elConfig} value={props.value} onChange={props.changed} >
          {props.elConfig.options.map(op => (
            <option key={op.value} value={op.value}>{op.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = <input className={inputClass.join(' ')} {...props.elConfig} value={props.value} onChange={props.changed} />;
  }

  return (
    <div className="input">
      <label>{props.label}</label>
      {inputEl}
      {validationError}
    </div>
  );
}

export default input;