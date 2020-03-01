import React from 'react'
import classes from './BuildControls.module.css'
import Buildcontrol from './Buildcontrol/Buildcontrol';

const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Bacon', type:'bacon'},
  {label: 'Meat', type:'meat'}

]
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price:{props.price.toFixed(2)}</p>
    {controls.map(ctrl => (
      <Buildcontrol 
        key={ctrl.label} 
        label={ctrl.label}
        added = {() => props.ingredientAdded(ctrl.type)}
        removed = {() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button 
      className={classes.OrderButton}
      onClick={props.ordered}
      disabled={! props.purchaseable}>ORDER NOW</button>
  </div>
);

export default BuildControls;