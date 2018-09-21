import React, {Component} from 'react';
import Auxi from 'Hoc/Auxi';
import Navigation from 'Components/Navigation/Navigation';
import './layout.scss';

class Layout extends Component {
  state = {
    nav: false
  }

  navClosedHandler = () => {
    this.setState({nav: false});
  }

  navToggleHandler = () => {
    this.setState((prevState) => {
      return {nav: !prevState.nav}
    });
  }

  render() {
    return (
      <Auxi>
        <Navigation
          toggleNav={this.navToggleHandler}
          closeNav={this.navClosedHandler}
          showNav={this.state.nav}  />
        <main className="content">
          {this.props.children}
        </main>
      </Auxi>
    );
  }
}

export default Layout;