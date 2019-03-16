import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import axios from '../../../Axios';
import Spinner from '../../../UI/Spinner/Spinner';
import Aux from '../../../HOC/Auxx/Auxx';
import Post from '../../Post/Post';
import Button from '../../../UI/Button/Button';
import classes from './Home.css';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import Input from '..//../../UI/Input/Input';

class Home extends Component {
  state = {
    loading: true,
    posts: [],
    deleted: false,
    popup: false,
    notice: ''
  }
  onBack = () => {
    this.fecthPosts();
    this.setState({ popup: false });
  }
  componentDidMount() {
    this.fecthPosts();
  }

  fecthPosts = () => {
    axios.get('/notice/notices')
      .then(res => {
        this.setState({ loading: false, posts: res.data.posts });
      })
  }
  onSubmitNoticeHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const body = {
        notice: this.state.notice,
        createdBy: localStorage.getItem('id')
    }
    axios.post('/notice/add', body) // /posts
        .then(res => {
          this.fecthPosts();
          this.setState({ loading: false, popup: false }); 
        })
        .catch(e => {
            this.setState({ loading: false });
        })
}
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ popup: true });
    // this.props.history.push('/notice/addpost');
  }
  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onDeleteHandler = (e, id) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.delete('/posts/' + id )
      .then(res => {
        this.setState({loading: false, deleted: true});
        this.fecthPosts();
      })
      .catch(e => {
        this.setState({loading: false, deleted: false});
      });
  }

  render() {
    
    let date;
    let ren = this.state.posts.map(post => {
        date = moment(parseInt(post.createdAt)).format('D/MM/YYYY h:mm A');
        return (<Post key={post._id} title={' '} date={date}>{post.notice}
          <form method="POST" onSubmit={(e) => this.onDeleteHandler(e, post._id)}>
          </form>
        </Post>)
      });
    if(this.state.loading) {
        ren = <Spinner />;
    }
    let rend = (
      <Aux>
        <div className={classes.Button}>
          <form method="POST" onSubmit={(e) => this.onSubmitHandler(e)}>
            <Button>Add Post</Button>
          </form>
        </div>
        {ren}
      </Aux>
    ) ;
    if(this.state.popup) {
      rend = (
        <div className={classes.addNoticeDiv}>
          <div className={classes.addNoticeSubDiv}>
            <h1>Add Notice</h1>
            <form onSubmit={(e) => this.onSubmitNoticeHandler(e)}>
              <Input type="text" name="notice" value={this.state.notice} onChange={(e) => this.inputChangedHandler(e)} placeholder="Notice here.."  required />
              <Button>Add Notice</Button>
            </form>          
            <Button onClick={this.onBack}>Back</Button>
          </div>
        </div>
      );
    }
    return rend;
  }

}


export default withErrorHandler(withRouter(Home), axios);