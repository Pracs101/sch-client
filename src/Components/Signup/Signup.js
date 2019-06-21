import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Signup.css';
import axios from '../../Axios';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Box from '../../UI/Box/Box';
import Select from '../../UI/Select/Select';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SaveItem from '../../HOC/LocalStorage/SaveItem';
import saveItem from '../../HOC/LocalStorage/SaveItem';

class Signup extends Component {

  state = {
    fname: '',
    lname: '',
    phoneNumber: '',
    email: '',
    password: ''
  }

  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitDataHandler = (e) => {
    e.preventDefault();
      const data = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      };
      axios.post('/user/signup', data)
        .then(res => {
          if(res) {
            saveItem('fname', res.data.data.fname);
            SaveItem('token', res.headers['x-auth']);
            SaveItem('id', res.data.data.userID);
            this.props.auth();
            this.props.history.replace('/home');
          }
        })
        .catch(e => {
          // console.log(e);
        })
  }

  render() {
    return (
      <div className={classes.Signup}>
        <Box>
          <h1>Connect</h1>
          <h2>{this.props.title}</h2>
          <form method="POST" onSubmit={(event) => this.onSubmitDataHandler(event)}>
              <Input type="text" value={this.state.fname} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your First Name" name="fname" required />
              <Input type="text" value={this.state.lname} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your Last Name" name="lname" required /> 
              <Input type="text" value={this.state.phoneNumber} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your Phone Number" name="phoneNumber" minLength="10" maxLength="10" required />
              <Input type="email" value={this.state.email} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your E-Mail ID" name="email" />
              <Input type="password" value={this.state.password} onChange={(event) => this.inputChangedHandler(event)} placeholder="Password" name="password" minLength="8" maxLength="20" required />
              <Button>{this.props.title}</Button>
          </form>    
        </Box>
      </div>
    );
  }
}

export default withErrorHandler(withRouter(Signup), axios);
