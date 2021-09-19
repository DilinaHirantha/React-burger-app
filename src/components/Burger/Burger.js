import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css'

const burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])]
            .map((_, i) => {
                // console.log(ingKey + props.ingredients[ingKey])
                return <BurgerIngredient key={ingKey + i} type={ingKey}/>
            });
    }).reduce((arr, el) => { /* arr - previous value, el- new value */
        // console.log(el)
        return arr.concat(el);
    }, []);

    // console.log(burgerIngredients)
    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please add Ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;

