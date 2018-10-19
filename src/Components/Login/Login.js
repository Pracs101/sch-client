import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../Axios';
import classes from './Login.css'; 
import Box from '../../UI/Box/Box';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SaveItem from '../../HOC/LocalStorage/SaveItem';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends Component {
  state = {
    sapid: '',
    password: '',
    token: '',
    loading: false
  }
  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmitDataHandler = (e) => {
    this.setState({loading: true});
    e.preventDefault();
    const data = {
      sapid: this.state.sapid,
      password: this.state.password
    };
    axios.post('/user/login', data)
      .then(res => {
        console.log(res);
        if(res) {
          // console.log('dept',res.data.data.dept);
          SaveItem('token', res.data.token);
          SaveItem('id', res.data.data._id);
          SaveItem('dept', res.data.data.dept);
          SaveItem('name', res.data.data.name);
          SaveItem('type', res.data.data.type);
          console.log('--------');
          this.setState({ token: res.data.token });
          console.log(res.data.token);
          console.log('flag', res.data.data.wallFlag);
          if(res.data.data.wallFlag === 'true') {
            this.props.setWallFlag();
            console.log('after call');
            
          }
          this.props.history.replace('/home');
          this.props.auth();        
          this.props.setDept(res.data.data.dept);
            this.setState({loading: false});
        }
        console.log(this.props.history);
      })
      .catch(e => {
        console.log(e.response);
        this.setState({loading: false});
      })
  }
  render() {
      let ren = null;
      if(this.state.loading) {
          ren = <Spinner />;
      }
      else {
        ren=(
        <div className={classes.Login}>
        <Box>
          <h1>Connect</h1>
          <h2>Login</h2>
          <form method="POST" onSubmit={(e) => this.onSubmitDataHandler(e)}>
              <Input type="tel" value={this.state.sapid} onChange={(e) => this.inputChangedHandler(e)} placeholder="Your SAP ID" name="sapid" minLength="11" maxLength="11" required />
              <Input type="password" value={this.state.password} onChange={(e) => this.inputChangedHandler(e)} placeholder="Password" name="password" minLength="8" maxLength="20" required />
              <p><a href="/signup">Signup?</a></p>
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