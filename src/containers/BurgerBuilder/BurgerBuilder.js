import React, { Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from  '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
    loading:false,
    error: false
  }

  componentDidMount () {
    axios.get('https://burger-a0424.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients:response.data});
      })
      .catch(error => {
        this.setState({error:true})
      })
  }

  updatedPurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum,el) =>{
        return sum + el;
      },0)
    this.setState({purchaseable:sum>0})
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    this.updatedPurchaseState(updatedIngredients)

  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <=0 ) {
      return;
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    this.updatedPurchaseState(updatedIngredients)

  }

  purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');

    this.props.history.push({ 
      pathname: '/checkout',
      search: '?' + queryString
    })
    // alert('You continue')
    /* this.setState({loading:true})
    
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Boluwatife Owoade',
        email: 'bolu@test.com',
        address: 'test address',
        country: 'Nigeria'
      },
      delivery: 'DHL'

    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading:false, purchasing:false})
      })
      .catch(error => {
        this.setState({loading:false, purchasing:false})
      }); */
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />

    if(this.state.ingredients) {
      burger = 
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded = {this.addIngredientsHandler}
            ingredientRemoved = {this.removeIngredientsHandler}
            disabled = {disabledInfo}
            price={this.state.totalPrice}
            ordered = {this.purchaseHandler}
            purchaseable={this.state.purchaseable}
          />
        </Aux>
      orderSummary =  <OrderSummary 
      purchaseCancelled={this.purchaseCancelHandler}
      ingredients={this.state.ingredients}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice}/>
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);