import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Aux from '../../HOC/Auxx/Auxx';
import Auth from '../Auth/Auth';
import Logout from '../../Components/Logout/Logout';
import AdminLogout from '../../Components/Logout/AdminLogout';
import Home from '../../Components/Home/Home';
import RemoveItem from '../../HOC/LocalStorage/RemoveItem';
import AdminHome from '../../Components/Admin/Home/Home';
import Scholarship from '../../Components/Scholarship/Scholarship';
import Profile from '../../Components/Profile/Profile';
// import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import PerfectNav from '../../Components/Navigation/PerfectNav/PerfectNav';
import Sch from '../../Components/Scholarship/Scholarship';

class Layout extends Component {
  state = {
    isAuth: false,
    isAdmin: false,
    _id: null,
    isWallFlag: false,
    dept: ''
  }
  
  setDept = (dept) => {
    this.setState({ dept: dept });
    console.log(this.state.dept);
  }

  loginHandler = () => {
    this.setState({isAuth: true});
    console.log(this.state.isAuth);
  }
  switchToAdminHandler = () => {
    this.setState({isAdmin: true});
  }
  adminLogoutHandler = () => {
    this.setState({isAuth: false, isAdmin: false});
  }
  logoutHandler = () => {
    this.setState({isAuth: false, isWallFlag: false});
  }
  setWallFlagHandler = () => {
    this.setState({ isWallFlag: true });
    console.log('in layout',this.state.isWallFlag);
  }

  componentWillMount() {
    if(this.props.login) {
      this.loginHandler();
    }
    if(this.props.logout) {
      this.adminLogoutHandler;
      RemoveItem('token');
      RemoveItem('id');
    }
    if(this.props.admin) {
      this.switchToAdminHandler();
      this.loginHandler();
    }
  }

  render() {
    let ren;
    if(!this.state.isAuth) {
      ren = <Auth setDept={this.setDept} auth={this.loginHandler} switchToAdmin={this.switchToAdminHandler} setWallFlag={this.setWallFlagHandler}  />;
    } else {
        if(!this.state.isAdmin) {
          ren = (
            <Aux>
              <PerfectNav admin={this.state.isAdmin}>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/scholarship" component={() => <Scholarship user />} />
                <Route path="/profile" component={() => <Profile />} />
                <Route path="/logout" exact component={() => <Logout logout={this.logoutHandler} />} />
              </Switch>
              </PerfectNav>       
            </Aux>
          );
        } else if(this.state.isAdmin) {
          ren = (
            <Aux>
              <PerfectNav admin={this.state.isAdmin}>
              <Switch>
                <Route path="/admin/notice" exact component={AdminHome} />
                <Route path="/admin/scholarship" exact component={() => <Sch /> }/>
                <Route path="/admin/logout" exact component={() => <AdminLogout logout={this.adminLogoutHandler} />} />
              </Switch>
              </PerfectNav>       
            </Aux>
          );
        }
    }
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}

export default withRouter(Layout);