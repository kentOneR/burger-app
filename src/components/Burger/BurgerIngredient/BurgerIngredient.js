import React, {Component} from 'react';
import PropTypes from 'prop-types';

class burgerIngredient extends Component {
  redner() {
    let ingredient = null;

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className="burger-ingredient bread-bottom"></div>;
        break;
      case ('bead-top'):
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
        ingredient = <div className="burger-burger-ingredient cheese"></div>;
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

burgerIngredient.PropTypes = {
  type: PropTypes.string.isRequired
}

export default burgerIngredient;