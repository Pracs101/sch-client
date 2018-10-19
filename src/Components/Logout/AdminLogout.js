import React from 'react';
import { Redirect } from 'react-router-dom';

import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../Axios';
import RemoveItem from '../../HOC/LocalStorage/RemoveItem';

const logout = (props) => {
  let token = localStorage.getItem('token');
  const headers = {
    'x-auth': token
  }
  axios.delete('/admin/me/token', { headers })
    .then(res => {
      RemoveItem('token');
      RemoveItem('id');
      props.logout();
    })
    .catch(e => console.log(e));
  return <Redirect to='/admin' />;
}

export default withErrorHandler(logout, axios);