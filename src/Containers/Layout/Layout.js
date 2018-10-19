import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Aux from '../../HOC/Auxx/Auxx';
import Auth from '../Auth/Auth';
import Logout from '../../Components/Logout/Logout';
import AdminLogout from '../../Components/Logout/AdminLogout';
import Home from '../../Components/Home/Home';
import RemoveItem from '../../HOC/LocalStorage/RemoveItem';
import AdminHome from '../../Components/Admin/Home/Home';
import AddPost from '../../Components/Admin/AddPost/AddPost'; 
import Signup from '../../Components/Signup/Signup';
import Wall from '../../Components/Wall/Wall';
import Dept from '../../Components/Dept/Dept';
import Chat from '../../Components/Dept/Chat/Chat';
import Profile from '../../Components/Profile/Profile';
// import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import PerfectNav from '../../Components/Navigation/PerfectNav/PerfectNav';

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
    console.log('Layout: ', this.state);
    
  }

  render() {
    console.log(this.props.history)
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
                <Route path="/dept" exact component={() => <Dept />} />
                <Route path="/dept/chat" exact component={() => <Chat />} />
                <Route path="/wall" component={() => <Wall dept={this.state.dept} isWall={this.state.isWallFlag} />} />
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
                <Route path="/admin/home" exact component={AdminHome} />
                <Route path="/admin/addpost" exact component={() => <AddPost url="/posts" />} />
                <Route path="/admin/addstaff" exact component={() => <Signup isStaff="true" title="Add staff"/>} />} />
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