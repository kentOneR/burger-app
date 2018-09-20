import React from 'react';
import './modal.scss';

const modal = (props) => (
    <div className="modal">
        {props.children}
    </div>
);

export default modal;