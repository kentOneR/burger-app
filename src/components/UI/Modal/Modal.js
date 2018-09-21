import React, {Component} from 'react';
import Auxi from 'Hoc/Auxi';
import Backdrop from 'Components/UI/Backdrop/Backdrop';
import './modal.scss';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== !this.props.children;
  }

  componentWillUpdate() {
    console.log('[Modal] WillUpdate');
  }

  render() {
    return (
      <Auxi>
        <div className={`modal ${this.props.show ? 'active' : ''}`}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
      </Auxi>
    );
  }
}

export default Modal;