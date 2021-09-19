import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const control = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];


const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {control.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}
                          reduce={() => props.ingredientRemove(ctrl.type)}
                          add={() => props.ingredientAdd(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW
        </button>
    </div>
);

export default BuildControls
