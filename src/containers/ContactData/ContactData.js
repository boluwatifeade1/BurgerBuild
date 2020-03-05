import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
class ContactData extends Component {
  state = {
    name:'',
    email:'',
    address: {
      street:'',
      postalCode:''
    },
    loading:false
  }
  orderHandler = (event) => {
    event.preventDefault()
    this.setState({loading:true})
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({loading:false})
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading:false})
      });
  }
  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" placeholder="your name" name="name" />
        <input className={classes.Input}  type="email" placeholder="your email" name="email" />
        <input className={classes.Input} type="text" placeholder="Street" name="street" />
        <input className={classes.Input} type="text" placeholder="Postal Code" name="postal" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData