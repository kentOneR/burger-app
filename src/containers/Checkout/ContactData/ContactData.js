import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from 'Components/UI/Button/Button';
import Spinner from 'Components/UI/Spinner/Spinner';
import Input from 'Components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import axios from '../../../AxiosOrders';
import withErrorHandler from 'Hoc/withErrorHandler';
import './contact_data.scss';

class ContactData extends Component {
  state = {
    orderFrom: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      zipCode: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your ZIP code'
        },
        value: '',
        validation: {
          required: true,
          length: 5,
          valid: false,
          touched: false
        }
      },
      city: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false
        }
      },
      deliveryMethod: {
        elType: 'select',
        elConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'}, 
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
          placeholder: 'Delivery method'
        },
        value: 'fastest',
        validation: {
          valid: true,
          touched: false
        }
      },
    },
    formIsValid: false
  }

  orderhandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let elId in this.state.orderFrom) {
      formData[elId] = this.state.orderFrom[elId].value;
    }

    const order = {
      ingredient: this.props.ings,
      price: this.props.price,
      orderData: formData
    }

    this.props.onPurchaseBurger(order, this.props.token);
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

    return isValid;
  }

  inputChangedHandler = (e, inputId) => {
    // const updateForm = {...this.state.orderFrom},
    //       updateFormEl = {...updateForm[inputId]};

    // updateFormEl.value = e.target.value;
    // updateForm[inputId] = updateFormEl;
    // this.setState({
    //   orderFrom: updateForm
    // });

    const updateForm = {...this.state.orderFrom};
    updateForm[inputId].value = e.target.value;
    updateForm[inputId].validation.touched = true;
    updateForm[inputId].validation.valid = this.checkValidity(updateForm[inputId].value, updateForm[inputId].validation);

    let formIsValid = true;
    for (let id in updateForm) {
      formIsValid = formIsValid && updateForm[id].validation.valid;
    }
    console.log(formIsValid);
    
    this.setState({orderFrom: updateForm,formIsValid: formIsValid});
  }

  render() {
    const formElArray = [];

    for (let key in this.state.orderFrom) {
      formElArray.push({
        id: key,
        ...this.state.orderFrom[key]
      });
    }

    let form = (
      <form onSubmit={this.orderhandler}>
        {formElArray.map(input => (
          <Input
            key={input.id} 
            elType={input.elType}
            label={input.id}
            elConfig={input.elConfig} 
            value={input.value} 
            invalid={!input.validation.valid}
            touched={input.validation.touched}
            changed={(e) => this.inputChangedHandler(e, input.id)} />
        ))}
        <Button btnType="success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className="contact-data">
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (order, token) => dispatch(orderActions.purchaseBurger(order, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));