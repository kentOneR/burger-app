import React, {Component} from 'react';
import Button from 'Components/UI/Button/Button';
import Spinner from 'Components/UI/Spinner/Spinner';
import axios from '../../../AxiosOrders';
import Input from 'Components/UI/Input/Input';
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
        value: ''
      },
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: ''
      },
      zipCode: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your ZIP code'
        },
        value: ''
      },
      city: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your city'
        },
        value: ''
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
        value: ''
      },
    },
    loading: false
  }

  orderhandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (let elId in this.state.orderFrom) {
      formData[elId] = this.state.orderFrom[elId].value;
    }

    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
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
    this.setState({
    orderFrom: updateForm
    });
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
            elConfig={input.elConfig} 
            value={input.value} 
            changed={(e) => this.inputChangedHandler(e, input.id)} />
        ))}
        <Button btnType="success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;