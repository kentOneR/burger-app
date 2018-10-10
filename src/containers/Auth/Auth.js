import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';


import Button from 'Components/UI/Button/Button';
import Input from 'Components/UI/Input/Input';
import Spinner from 'Components/UI/Spinner/Spinner';
import './auth.scss';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
    }

    if (rules.length && isValid) {
      isValid = value.length === rules.length;
    }

    if (rules.isEmail && isValid) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value);
    }

    return isValid;
  }

  inputChangedHandler = (e, controlName) => {
    const updateControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({controls: updateControls});

  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthMode = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  }

  render() {
    const formElArray = [];

    for (let key in this.state.controls) {
      formElArray.push({
        id: key,
        ...this.state.controls[key]
      });
    }

    let form = formElArray.map(input => (
      <Input
        key={input.id} 
        elType={input.elType}
        label={input.id}
        elConfig={input.elConfig} 
        value={input.value} 
        invalid={!input.valid}
        touched={input.touched}
        changed={(e) => this.inputChangedHandler(e, input.id)} />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error}</p>
      );
    }

    let authRedirect;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirect} />
    }

    return (
      <div className="auth">
        {authRedirect}
        <h3>{!this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</h3>
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthMode} 
          btnType="danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, pass, isSignup) => dispatch(actions.auth(email, pass, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);