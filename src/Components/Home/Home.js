import React, { Component } from 'react';
import moment from 'moment';

import axios from '../../Axios';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../HOC/Auxx/Auxx';
import Post from '../Post/Post';
import DjLogo from '../Logo/DjLogo/DjLogo';

class Home extends Component {
  state = {
    loading: true,
    posts: []
  }
  componentDidMount() {
    axios.get('/posts')
      .then(res => {
        this.setState({ loading: false, posts: res.data.posts })
        console.log(this.state.posts);
      })
  }
  render() {
    let date;
    let ren = this.state.posts.map(post => {
      date = moment(post.createdAt).format('D/MM/YYYY h:mm A');
      return (<Post key={post._id} title={post.title} date={date}>{post.text}</Post>)
    })
    if(this.state.loading) {
      ren = <Spinner />
    }
    
    return (
      <Aux>
        <DjLogo />
        {ren}
      </Aux>
    );
  }
}


export default Home;