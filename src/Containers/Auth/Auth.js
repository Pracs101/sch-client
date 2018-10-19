import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';
import AdminLogin from '../../Components/AdminLogin/AdminLogin';

class Auth extends Component {

  render() {
    let routes;
    routes = (
      <Switch>
        <Route path="/admin" component={() => <AdminLogin auth={this.props.auth} switchToAdmin={this.props.switchToAdmin}/>} />
        <Route path="/signup" component={() => <Signup setDept={this.props.setDept} isStaff="false" title="Sign up" auth={this.props.auth}/>} />
        <Route path="/" component={() => <Login setDept={this.props.setDept} auth={this.props.auth} setWallFlag={this.props.setWallFlag} />} />
      </Switch>
    );
    return routes;
  }
}

export default Auth;