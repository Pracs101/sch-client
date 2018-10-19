import React, { Component } from 'react';

import Aux from '../../../HOC/Auxx/Auxx';
import Box from '../../../UI/Box/Box';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from '../../../Axios';
import { withRouter } from 'react-router-dom';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';


class AddPost extends Component {
    state = {
        title: '',
        text: '',
        loading: false
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const body = {
            title: this.state.title,
            text: this.state.text,
            _id: localStorage.getItem('id')
        }
        if(this.props.isWall) {
            body.dept = localStorage.getItem('dept');
            body.type = "staff";
        }
        axios.post(this.props.url, body) // /posts
            .then(res => {
                this.setState({ loading: false });
                if(this.props.isWall) {
                    this.props.back();
                } else {
                    this.props.history.replace('/admin/home');
                } 
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log(e);
            })
    }
    inputChangedHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        return (
            <Aux>
                <div style={{
                    margin:' 185px auto'
                }}>
                    <Box width="400px" height="300px">
                        <div style={{
                            padding: '50px'
                        }}>
                            <form onSubmit={(e) => this.onSubmitHandler(e)}>
                                <Input type="text" name="title" value={this.state.title} onChange={(e) => this.inputChangedHandler(e)} placeholder="Title here.."  required />
                                <Input type="text" name="text" value={this.state.text} onChange={(e) => this.inputChangedHandler(e)} placeholder="Notice here.."  required />
                                <Button>Add Post</Button>
                            </form>
                        </div>
                    </Box>
                </div>
            </Aux>
        );
    }
}


export default withErrorHandler(withRouter(AddPost), axios) ;