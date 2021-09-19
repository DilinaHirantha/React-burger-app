import React from 'react';
import Aux from '../../../hoc/Auxs'

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span> : {props.ingredients[ingKey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>Burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )

}

export default OrderSummary
