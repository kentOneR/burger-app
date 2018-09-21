import React from 'react';
import Auxi from 'Hoc/Auxi';
import Backdrop from 'Components/UI/Backdrop/Backdrop';
import './modal.scss';

const modal = (props) => (
    <Auxi>
        <div className={`modal ${props.show ? 'active' : ''}`}>
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed} />
    </Auxi>
);

export default modal;