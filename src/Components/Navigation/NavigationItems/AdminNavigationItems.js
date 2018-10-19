import React from 'react';

import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const nav = (props) => {
  return (
    <ul className={classes.Nav} >
      <NavItem link="/admin/home" exact right >Home</NavItem>
      <NavItem link="/admin/addpost" exact right >Add Post</NavItem>
      <NavItem link="/admin/addstaff" exact right >Add Staff</NavItem>
      <NavItem link="/admin/logout" exact right >Logout</NavItem>
    </ul>
  );
}

export default nav;