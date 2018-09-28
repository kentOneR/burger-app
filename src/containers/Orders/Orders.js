import React, {Component} from 'react';
import axios from '../../AxiosOrders';
import Order from 'Components/Orders/Order';
import withErrorHandler from 'Hoc/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        let fetchedorders = [];
        for (let key in res.data) {
          fetchedorders.push({
            ...res.data[key],
            id: key
          })
        }
        this.setState({
          loading: false,
          orders: fetchedorders
        })
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order 
            key={order.id}
            ingredients={order.ingredient} 
            price={+order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);