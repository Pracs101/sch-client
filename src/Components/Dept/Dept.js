import React, { Component } from 'react';
import moment from 'moment';

import Post from '../../Components/Post/Post';
import { withRouter } from 'react-router-dom';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'; 
import axios from '../../Axios';
import Aux from '../../HOC/Auxx/Auxx';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Box from '../../UI/Box/Box';
import Spinner from '../../UI/Spinner/Spinner';


class Dept extends Component {
    state = {
        questions: [],
        loading: true,
        text: '',
        title: '',
        question: null
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    fetchQuestions = () => {
        let ques;
        let date;
        const dept = localStorage.getItem('dept');
        if(dept) {
            axios.get('/questions/' + dept)
                .then(res => {
                    console.log('quess', res.data.ques);
                      
                    ques = res.data.ques.map(q => {
                        date = moment(q.createdAt).format('D/MM/YYYY h:mm A');
                        return {
                            title: q.title,
                            date: date,
                            by: q.name,
                            id: q._id,
                            text: q.text
                        }
                    })
                    this.setState({ questions: ques, loading: false });
                })  
                .catch(e => {
                    console.log(e);
                })
        }
    }

    onClickHandler = (qid) => {
        // this.props.history.replace('/dept/chat');
        // console.log('---', this.state.questions[0]);
        
        const question = this.state.questions.find(q => q.id == qid);
        this.props.history.replace({
                pathname: '/dept/chat',
                state: {
                    question
                }
            });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const body = {
            title: this.state.title,
            text: this.state.text,
            _id: localStorage.getItem('id'),
            type: localStorage.getItem('type'),
            dept: localStorage.getItem('dept')
        }
        axios.post('/question', body) // /posts
            .then(res => {
                this.setState({ loading: false });
                this.fetchQuestions();
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log(e);
            })
            
    }
    inputChangedHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    
    render() {
        console.log('---', this.state.questions);
        let ren = null;
        if (this.state.loading) {
            ren = <Spinner />;
        }
        if (!this.state.loading && this.state.questions.length < 1) {
            ren = <div>
                    <h1 style={{
                        color: '#F44336',
                        textAlign: 'center'
                        }}>No Questions!</h1>
                    <div style={{
                        height: '360px'
                    }}></div>
                </div>
        }
        if(this.state.questions.length > 0) {
            ren = this.state.questions.map((qu, i) => <div onClick={() => this.onClickHandler(qu.id)} key={qu.date + qu.by + i } ><Post title={qu.title} date={qu.date}>--{qu.by}</Post></div>);
        }
        return (
            <Aux>
                <Box width="800px" height="270px">
                    <h1>What is your question?</h1>
                    <form onSubmit={(e) => this.onSubmitHandler(e)}>
                        <Input type="text" name="title" value={this.state.title} onChange={(e) => this.inputChangedHandler(e)} placeholder="Question here.."  required />
                        <Input type="text" name="text" value={this.state.text} onChange={(e) => this.inputChangedHandler(e)} placeholder="Description here.." />
                        <Button>Add Question</Button>
                    </form>
                </Box>
                {ren}
            </Aux>
        );
    }
}

export default withErrorHandler(withRouter(Dept), axios);