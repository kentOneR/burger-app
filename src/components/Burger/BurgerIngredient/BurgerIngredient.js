import React, {Component} from 'react';
import './burger_ingredient.scss';
import PropTypes from 'prop-types';

class burgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className="burger-ingredient bread-bottom"></div>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className="burger-ingredient bread-top">
            <div className="seeds1"></div>
            <div className="seeds2"></div>
          </div>
        );
        break;
      case ('meat'):
        ingredient = <div className="burger-ingredient meat"></div>;
        break;
      case ('cheese'):
        ingredient = <div className="burger-ingredient cheese"></div>;
        break;
      case ('bacon'):
        ingredient = <div className="burger-ingredient bacon"></div>;
        break;
      case ('salad'):
        ingredient = <div className="burger-ingredient salad"></div>;
        break;  
      default:
        ingredient = null;
    }
  
    return ingredient;
  }
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient;