import React, {Component} from 'react';
import Button from 'Components/UI/Button/Button';
import './contact_data.scss';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: '',
            city: ''
        }
    }

    render() {
        return (
            <div className="contact-data">
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="your name" />
                    <input type="text" name="email" placeholder="your name" />
                    <input type="text" name="street" placeholder="your name" />
                    <input type="text" name="postalCode" placeholder="your name" />
                    <input type="text" name="city" placeholder="your name" />
                    <Button btnType="success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;