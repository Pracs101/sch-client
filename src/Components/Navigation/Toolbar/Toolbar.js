import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Layout from '../../../Containers/Layout/Layout';
import AdminNav from '../NavigationItems/AdminNavigationItems';
import autoLogin from '../../../HOC/AutoLogin/AutoLogin';

class Toolbar extends Component {
    render () {
        let navChange = null;
        if (this.props.admin) {
            navChange = <AdminNav />  
        }
        else {
            navChange = <NavigationItems />
        }
        return (
            <header className={classes.Toolbar}>
                <DrawerToggle clicked={this.props.drawerToggleClicked} />
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    {navChange}
                </nav>
            </header>
        );
    }
}
    

export default withRouter(Toolbar);