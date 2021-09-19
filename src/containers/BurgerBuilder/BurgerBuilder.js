import React, {Component} from 'react';
import Aux from '../../hoc/Auxs'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
        , totalPrice: 4,
        purchasable: false

    }

    INGREDIENT_PRICES = {
        salad: 0.5,
        bacon: 0.7,
        cheese: 0.4,
        meat: 1.7
    }

    purchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0}) /*set true if have ing*/
    }

    ingredientAddHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        console.log(updatedIngredients[type])
        const priceAdded = this.INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdded;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.purchaseHandler(updatedIngredients);
        // console.log(this.state)
    }


    ingredientRemoveHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduct = this.INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduct;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.purchaseHandler(updatedIngredients);
        // console.log(this.state)
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0; /* assign bool & disableInfo is like [salad:true, meat:false,..]*/
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientRemove={this.ingredientRemoveHandler}
                    ingredientAdd={this.ingredientAddHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Aux>

        )
    }

};

export default BurgerBuilder;
