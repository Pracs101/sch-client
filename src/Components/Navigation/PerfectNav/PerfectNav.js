import React, { Component } from 'react';

import Aux from '../../../HOC/Auxx/Auxx';
import classes from './PerfectNav.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Footer from '../../Footer/Footer';

class PerfectNav extends Component {
    state = {
        showSideDrawer: false,
        isAdmin: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    switchToAdminHandler = () => {
        this.setState({isAdmin: true});
    }

    componentWillMount() {
        if(this.props.admin) {
            this.switchToAdminHandler();
        }
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} admin={this.state.isAdmin}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

export default PerfectNav;