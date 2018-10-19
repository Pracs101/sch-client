import React, { Component } from 'react';

import Box from '../../../../UI/Box/Box';
import Button from '../../../../UI/Button/Button';
import axios from '../../../../Axios';
import withErrorHandler from '../../../../HOC/withErrorHandler/withErrorHandler';
// import { invalid } from 'moment';

class Answer extends Component {
    state = {
        like: 0,
        dislike: 0
    }

    componentDidMount() {
        this.setState({ like: this.props.like, dislike: this.props.dislike });
    }

    render() {
        const increment = (e, type) => {
            e.preventDefault();
            if(type === 'like') {
                console.log('INC LIKE');
                console.log(e.target['button']);
                e.target['like'].disabled = true;
            } else {
                console.log('INC DISLIKE');
                e.target['dislike'].disabled = true;
            }
            const body = {
                type
            }
            axios.post('/answer/votes/' + this.props.a_id, body)
                .then(res => {
                    if(type === 'like') {
                        this.setState({ like: res.data.like });
                    } else {
                        this.setState({ dislike: res.data.dislike });
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }
        let ren = null;
        ren = (
            <Box textAlign="left"  height="200px" width="80%" >
            <div style={{
                fontSize: '1.0em',
                float: 'right',
                display: 'flex',
                paddingRight: '50px'
            }}>
                <small style={{
                    paddingRight: '40px'
                }}>{this.props.date}  </small> <br /> <br />
                <small> by {this.props.by}</small>
            </div>
                <p style={{
                    fontSize: '1.2em',
                    paddingLeft: '15px'
                }}>{this.props.body}</p>
                <div style={{
                    display: 'flex',
                    float: 'right',
                }}>
                    <form style={{
                        paddingRight: '50px',
                        paddingTop: '55px'
                    }} onSubmit={e => increment(e, 'like')}>
                        <Button name="like">Like({this.state.like})</Button>
                    </form>
                    <form style={{
                        paddingRight: '20px',
                        paddingTop: '55px'
                    }} onSubmit={e => increment(e, 'dislike')}>
                        <Button name="dislike">Dislike({this.state.dislike})</Button>
                    </form>
                </div>
            </Box> 
        );
        return ren;
    }
}

export default withErrorHandler(Answer, axios);