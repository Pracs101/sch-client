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

class Home extends Component {
  state = {
    loading: true,
    posts: [],
    deleted: false
  }
  componentDidMount() {
    this.fecthPosts();
  }

  fecthPosts = () => {
    axios.get('/posts')
      .then(res => {
        this.setState({ loading: false, posts: res.data.posts })
        console.log(this.state.posts);
      })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.history.push('/admin/addpost');
  }

  onDeleteHandler = (e, id) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.delete('/posts/' + id )
      .then(res => {
        console.log(res.data);
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
        date = moment(post.createdAt).format('D/MM/YYYY h:mm A');
        return (<Post key={post._id} title={post.title} date={date}>{post.text}
          <form method="POST" onSubmit={(e) => this.onDeleteHandler(e, post._id)}>
            <Button>Delete</Button>
          </form>
        </Post>)
      });
    if(this.state.loading) {
        ren = <Spinner />;
    }
    
    return (
      <Aux>
        <div className={classes.Button}>
          <form method="POST" onSubmit={(e) => this.onSubmitHandler(e)}>
            <Button>Add Post</Button>
          </form>
        </div>
        {ren}
      </Aux>
    );
  }

}


export default withErrorHandler(withRouter(Home), axios);