import React from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/Navigationitems/Navigationitems'
import classes from './SideDrawer.module.css'

const sideDrawer = props => {
  return (
    <div>
      <Logo />
      <nav>
        <NavigationItems></NavigationItems>
      </nav>
    </div>
  );
}

export default sideDrawer;