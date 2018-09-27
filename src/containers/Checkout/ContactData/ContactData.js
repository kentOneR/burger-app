import React, {Component} from 'react';
import Button from 'Components/UI/Button/Button';
import Spinner from 'Components/UI/Spinner/Spinner';
import axios from '../../../AxiosOrders';
import './contact_data.scss';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
        street: '',
        postalCode: '',
        city: ''
    },
    loading: false
  }

  orderhandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients);

    this.setState({loading: true});

    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max Schar',
        address: {
          zipCode: '78190',
          country: 'France'
        }
      }
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

  render() {
    let form = (<form>
      <input type="text" name="name" placeholder="your name" />
      <input type="text" name="email" placeholder="your name" />
      <input type="text" name="street" placeholder="your name" />
      <input type="text" name="postalCode" placeholder="your name" />
      <input type="text" name="city" placeholder="your name" />
      <Button btnType="success" clicked={this.orderhandler}>ORDER</Button>
    </form>);
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