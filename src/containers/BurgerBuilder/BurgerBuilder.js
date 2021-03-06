import React, {Component} from 'react';
import Aux from '../../hoc/Auxs/Auxs'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
    state = {
        ingredients: {},
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false

    }

    INGREDIENT_PRICES = {
        salad: 0.5,
        bacon: 0.7,
        cheese: 0.4,
        meat: 1.7
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({ingredients: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    purchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => { /*map object to array*/
            // console.log(ingKey)
            return ingredients[ingKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0}) /*set true if have ing*/
    }

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchasingContinueHandler = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dilina',
                address: {
                    street: '221/b',
                    country: 'USA'
                },
                email: 'dilina@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                purchasing: false
            })
        }).catch(error => {
            this.setState({
                loading: false,
                purchasing: false
            })
        })
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

        let orderSummary =
            <OrderSummary ingredients={this.state.ingredients}
                          price={this.state.totalPrice}
                          purchaseCanceled={this.purchasingCancelHandler}
                          purchaseContinue={this.purchasingContinueHandler}
            />

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} ModelClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientRemove={this.ingredientRemoveHandler}
                    ingredientAdd={this.ingredientAddHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                />
            </Aux>

        )
    }

};

export default withErrorHandler(BurgerBuilder, axios);
