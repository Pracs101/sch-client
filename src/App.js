import React, { Component } from 'react';

import Layout from './Containers/Layout/Layout';
import autoLogin from './HOC/AutoLogin/AutoLogin';
import axios from './Axios';

class App extends Component {

  state = { 
    login: false,
    logout: false,
    admin: false
  }

  changeState = (login, logout,  admin) => {
    this.setState({ login, logout, admin  });
    console.log('state:', this.state);
    
  }
  componentDidMount() {
    autoLogin(this.changeState);
  }

  render() {
    return (
      <div className="App">
        <Layout login={this.state.login} logout={this.state.logout} admin={this.state.admin} />
      </div>
    );
  }
}

export default App;
