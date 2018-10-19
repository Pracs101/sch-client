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

class Signup extends Component {

  state = {
    name: '',
    sapid: '',
    email: '',
    dept: '',
    password: '',
    confirmPassword: ''
  }

  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitDataHandler = (e) => {
    e.preventDefault();
    if(this.props.isStaff === 'true') {
      const data = {
        name: this.state.name,
        email: this.state.email,
        sapid: this.state.sapid,
        dept: this.state.dept,
        password: this.state.password
      };
      axios.post('/admin/user/signup', data)
        .then(res => {
          console.log(res);
          if(res) {
            this.props.history.replace('/admin/home');
            // this.props.setDept(res.data.data.dept);
          }
        })
        .catch(e => {
          console.log(e.response);
        })
    } else {
      const data = {
        name: this.state.name,
        email: this.state.email,
        sapid: this.state.sapid,
        dept: this.state.dept,
        password: this.state.password
      };
      axios.post('/user/signup', data)
        .then(res => {
          console.log(res);
          if(res) {
            SaveItem('token', res.data.token);
            SaveItem('id', res.data.data._id);
            SaveItem('dept', res.data.data.dept);
            SaveItem('name', res.data.data.name);
            SaveItem('type', res.data.data.type);
            this.props.auth();
            this.props.history.replace('/home');
            this.props.setDept(res.data.data.dept);
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  }

  render() {
    return (
      <div className={classes.Signup}>
        <Box>
          <h1>Connect</h1>
          <h2>{this.props.title}</h2>
          <form method="POST" onSubmit={(event) => this.onSubmitDataHandler(event)}>
              <Input type="text" value={this.state.name} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your Name" name="name" maxLength="25" required /> 
              <Input type="text" value={this.state.sapid} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your SAP ID" name="sapid" minLength="11" maxLength="11" required />
              <Input type="email" value={this.state.email} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your E-Mail ID" name="email" />
              <Select value={this.state.dept} onChange={(event) => this.inputChangedHandler(event)} name="dept" required>
                  <option value="">Department</option>
                  <option value="computer">Computer</option>
                  <option value="it">IT</option>
                  <option value="extc">EXTC</option>
                  <option value="civil">Civil</option>
                  <option value="mechanical">Mechanical</option>
              </Select>
              <Input type="password" value={this.state.password} onChange={(event) => this.inputChangedHandler(event)} placeholder="Password" name="password" minLength="8" maxLength="20" required />
              <Button>{this.props.title}</Button>
          </form>    
        </Box>
      </div>
    );
  }
}

export default withErrorHandler(withRouter(Signup), axios);

/* <div className={classes.main}>
          <div className={classes.container}>
              <h1>Connect</h1>
              <h2>Sign up</h2>
              <div>
                  <form method="POST" onSubmit={(event) => this.onSubmitDataHandler(event)}>
                      <input type="text" value={this.state.name} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your Name" name="name" maxLength="25" required /> 
                      <input type="text" value={this.state.sapid} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your SAP ID" name="sapid" minLength="11" maxLength="11" required />
                      <input type="email" value={this.state.email} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your E-Mail ID" name="email" />
                      <select value={this.state.dept} onChange={(event) => this.inputChangedHandler(event)} name="dept" required>
                          <option value="">Department</option>
                          <option value="computer">Computer</option>
                          <option value="it">IT</option>
                          <option value="extc">EXTC</option>
                          <option value="civil">Civil</option>
                          <option value="mechanical">Mechanical</option>
                      </select>
                      <input type="password" value={this.state.password} onChange={(event) => this.inputChangedHandler(event)} placeholder="Password" name="password" minLength="8" maxLength="20" required />
                      <input type="password" value={this.state.confirmPassword} onChange={(event) => this.inputChangedHandler(event)} placeholder="Confirm Password" name="confirmPassword" minLength="8" maxLength="20" required />
                      <button>Sign up</button>
                  </form>
              </div>
          </div>
      </div> */