import React from 'react';

import NavItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const nav = (props) => {
  return (
    <ul className={classes.Nav} >
      <NavItem link="/admin/scholarship" exact right >Scholarship</NavItem>
      <NavItem link="/admin/notice" exact right >Notice</NavItem>
      <NavItem link="/admin/logout" exact right >Logout</NavItem>
    </ul>
  );
}

export default nav;