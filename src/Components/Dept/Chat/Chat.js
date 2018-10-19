import React, { Component } from 'react';
import moment from 'moment';

import Question from './Question/Question';
import Aux from '../../../HOC/Auxx/Auxx';
import MessageButton from './MessgeForm/MessageButton/MessageButton';
import Answer from './Answer/Answer';
import { withRouter } from 'react-router-dom';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../../Axios';
import MessageForm from './MessgeForm/MessageForm';
import Spinner from '../../../UI/Spinner/Spinner';

// { body: 'answer1', date: '676989', by: 'abc' }
class Chat extends Component {
    state = {
        text: '',
        answers: [],
        loading: true
    }

    componentDidMount() {
       this.fetchAnswers();
    }
    fetchAnswers = () => {
        axios.get('/answers/' + this.props.location.state.question.id)
        .then(res => {
            console.log(res.data.ans);
            this.setState({ answers: res.data.ans, loading: false });
        })
        .catch(e => {
            console.log(e);         
        });
    }
    inputChangedHandler = (e) => {
       this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        const body = {
            text: this.state.text,
            _id: localStorage.getItem('id'),
            type: localStorage.getItem('type'),
            q_id: this.props.location.state.question.id
        }
        axios.post('/answer', body)
            .then(res => {
                this.fetchAnswers();
            })
            .catch(e => {
                console.log(e);
            });
        e.target['text'].value = '';
    }
    render() {
        let ren = null;
        console.log('chat', this.props.location.state.question);
        const question = this.props.location.state.question;
        let ans = null;
        let date;
        if (this.state.loading) {
            ans = <Spinner />;
        }
        if (!this.state.loading && this.state.answers.length < 1) {
            ans = <h1 style={{
                color: '#F44336',
                textAlign: 'center'
            }}>No Answers!</h1>
        }
        if(this.state.answers.length > 0) {
            ans = (
                <Aux>
                    {this.state.answers.map(ans => {
                        date = moment(ans.createdAt).format('D/MM/YYYY h:mm A');
                        return <Answer like={ans.like} dislike={ans.dislike} a_id={ans._id} key={ans.createdAt} body={ans.text} date={date} by={ans.name} />
                    })}
                </Aux>
            );
        }
        ren = (
            <Aux>
                <Question title={question.title} date={question.date} by={question.by} body={question.text} >    
                </Question>
                <h3 style={{
                    textAlign: 'center',
                    backgroundColor: '#20B2AA',
                    color: 'white',
                    padding: '30px' 
                }}>Answers</h3>
                {ans}
                <div style={{
                    position: 'sticky',
                    bottom: '0',
                    background: '#e6eaee',
                    display: 'flex',
                }}>
                    <form style={{
                        display: 'flex',
                        padding: '10px',
                        paddingLeft: '20px'
                    }}
                        method="POST" onSubmit={(e) => this.onSubmitHandler(e)} >
                        <MessageForm type="textbox" value={this.state.text} onChange={(e) => this.inputChangedHandler(e)} placeholder="Enter your Answer" name="text" required />
                        <div style={{
                            paddingLeft: '10px'
                        }}>
                            <MessageButton>Post</MessageButton>
                        </div>
                    </form>
                </div>
            </Aux>
        );
        return ren;
    }
}

export default withErrorHandler(withRouter(Chat), axios);