import React from 'react';

import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const nav = (props) => {
  return (
    <ul className={classes.Nav} >
      <NavItem link="/home" exact right >Home</NavItem>
      <NavItem link="/wall" exact right >Wall</NavItem>
      <NavItem link="/dept" exact right >Department</NavItem>
      <NavItem link="/profile" exact right >Profile</NavItem>
      <NavItem link="/logout" exact right >Logout</NavItem>
    </ul>
  );
}

export default nav;