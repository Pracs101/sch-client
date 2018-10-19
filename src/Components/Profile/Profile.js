import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Profile.css';
import ProfileIcon from '../../UI/ProfileIcon/ProfileIcon';
import axios from '../../Axios';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';

class Profile extends Component {
    state = {
        user: [],
        loading: true
    }
    componentDidMount () {
        const id = localStorage.getItem('id');
        console.log('id: ', id);
        
        axios.get('/user/me/' + id)
            .then(res => {
                console.log(res);
                if(res) {
                    console.log(res);
                    this.setState({user: res.data, loading: false});
                    console.log(this.state.user);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    render () {
        const dept = localStorage.getItem('dept');
        const name = localStorage.getItem('name');
        let profile = (
            <div className={classes.ProfileDesc}>
                <div className={classes.Nameh1}>
                    <p style={{
                        textTransform: 'capitalize'
                    }}>{name}</p>
                </div>
                <p style={{
                    textTransform: 'capitalize'
                }}className={classes.ProfileDescMore}>{dept} Engineering</p>
                <hr width="50%"></hr>
                <p className={classes.ProfileDescMore}>{this.state.user.sapid}</p>
                <hr width="50%"></hr>
                <p className={classes.ProfileDescMore}>{this.state.user.email}</p>
            </div>
        );
        if (this.state.loading) {
            profile = <Spinner />;
        }
        return (
            <div>
                <ProfileIcon />
                {profile}
            </div>
        );
    }
}

export default withErrorHandler(withRouter(Profile), axios);