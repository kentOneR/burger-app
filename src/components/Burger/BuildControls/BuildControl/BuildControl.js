import React from 'react';
import './build_control.scss';

const buildControl = (props) => (
  <div className="build-control">
    <div className="label">{props.label}</div>
    <button className="less">Less</button>
    <button className="more" onClick={props.added}>More</button>
  </div>
);

export default buildControl;