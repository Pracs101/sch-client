import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../Axios';
import classes from './AdminLogin.css'; 
import Box from '../../UI/Box/Box';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SaveItem from '../../HOC/LocalStorage/SaveItem';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends Component {
  state = {
    id: '',
    password: '',
    loading: false
  }
  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmitDataHandler = (e) => {
      this.setState({loading: true});
    e.preventDefault();
    const data = {
      uname: this.state.id,
      password: this.state.password
    };
    axios.post('/admin/login', data)
      .then(res => {
        if(res) {
          SaveItem('token', res.headers['x-auth']);
          SaveItem('id', res.data.data._id);
          this.props.switchToAdmin();
          this.props.history.replace('/admin/scholarship');
          this.props.auth();
        }
        this.setState({loading: false});
      })
      .catch(e => {
        this.setState({loading: false});
      })
  }
  render() {
      let ren =null;
      if (this.state.loading) {
          ren = <Spinner />;
      }
      else {
         ren = (
        <div className={classes.Login}>
        <Box>
          <h1>Connect</h1>
          <h2>Admin Login</h2>
          <form method="POST" onSubmit={(e) => this.onSubmitDataHandler(e)}>
              <Input type="text" value={this.state.sapid} onChange={(e) => this.inputChangedHandler(e)} placeholder="Username" name="id" required />
              <Input type="password" value={this.state.password} onChange={(e) => this.inputChangedHandler(e)} placeholder="Password" name="password" minLength="8" maxLength="20" required />
              <Button>Login</Button>
          </form>
        </Box>
      </div>
      );
      }
    return (
      <div>
        {ren}
    </div>
    );
  }   
} 

export default withErrorHandler(withRouter(Login), axios);