import React from 'react'
import classes from './Navigationitems.module.css'
import NavigationItem from '../Navigationitem/Navigationitem'

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link ='/' >Burger Builder</NavigationItem>
      <NavigationItem link ='/orders'>Orders</NavigationItem>
    </ul>
  )
}

export default navigationItems;