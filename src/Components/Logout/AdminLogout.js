import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../Axios';
import RemoveItem from '../../HOC/LocalStorage/RemoveItem';
import Spinner from '../../UI/Spinner/Spinner';

class Logout extends Component {
    state = {
        loading: false
    }
    componentWillMount () {
        let token = localStorage.getItem('token');
        this.setState({loading: true});
          const headers = {
            'x-auth': token
          }
          axios.delete('/admin/me/token', { headers })
            .then(res => {
              RemoveItem('token');
              RemoveItem('id');
              this.props.logout();
              this.setState({loading: false});
        })
        .catch(e => {
              console.log(e)
            this.setState({loading: false});
          });
    }
    render () {
        let ren = null;
        if (this.state.loading) {
            ren = <Spinner />;
        }
        else {
            ren = <Redirect to='/admin' />;
        }
        return (
            <div>
                {ren}
            </div>
        );
    }
}

export default withErrorHandler(Logout, axios);