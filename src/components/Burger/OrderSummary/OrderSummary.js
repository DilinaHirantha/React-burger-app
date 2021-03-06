import React, {Component} from 'react';
import Aux from '../../../hoc/Auxs/Auxs';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('[OrderSummary update]');
    // }


    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span> : {this.props.ingredients[ingKey]}
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
                <p><strong>Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default OrderSummary
