import * as actionTypes from './actionTypes';
import axios from '../../AxiosOrders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngFailed = () => {
    return {
        type: actionTypes.FETCH_ING_FAILED
    }
}

export const initIngredients = () => {
    return dispatch =>{
        axios.get('https://burgerapp-17e7d.firebaseio.com/ingredients.json')
        .then(res => {
          dispatch(setIngredients(res.data));
        })
        .catch(error => {
            dispatch(fetchIngFailed());
        });
    };
};