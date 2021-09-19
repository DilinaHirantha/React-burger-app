import React from 'react';
import Aux from '../../../hoc/Auxs';
import Button from "../../UI/Button/Button";

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
            <p><strong>Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )

}

export default OrderSummary
