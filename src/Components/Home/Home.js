import React, { Component } from 'react';
import moment from 'moment';

import axios from '../../Axios';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../HOC/Auxx/Auxx';
import Post from '../Post/Post';
import classes from './Home.css';
import ChatBox from '../../UI/Icons/DiscussionIcon/DiscussionIcon';
import CloseIcon from '../../UI/Icons/CloseIcon/CloseIcon';
import AddIcon from '../../UI/Icons/CloseIcon.1/CloseIcon';

class Home extends Component {
  state = {
    loading: true,
    posts: [],
    close: false 
  }
  componentDidMount() {
    axios.get('/notice/notices')
      .then(res => {
        this.setState({ loading: false, posts: res.data.posts })
      })
  }
  onCloseBot = () => {
    this.setState(prevState => {
      return {  
        close: !prevState.close
      }
    });
  }
  render() {
    let className = classes.Tooltip;
    let icon = <CloseIcon />;
    if(this.state.close) {
      className = classes.Close;
      icon = <AddIcon />;
    }
    let date;
    let ren = this.state.posts.map(post => {
      date = moment(parseInt(post.createdAt)).format('D/MM/YYYY h:mm A');
      return (<Post key={post._id} date={date}>{post.notice}</Post>)
    })
    if(this.state.loading) {
      ren = <Spinner />
    }
    let url = `https://cryptic-anchorage-76734.herokuapp.com/chat.html?name=${localStorage.getItem('fname')}&room=ScholarChat`
    return (
      <Aux>
        <div className={classes.livedis}>
          <div className={classes.chatbox}>
            <ChatBox />
            <a target="_" href={url} >Live Discussion</a></div>
        </div>
        <div className={classes.NoticeTag}>Notices</div>
        {ren}
        <iframe  className={className} src="https://assistant-chat-eu-gb.watsonplatform.net/web/public/a368c833-fc7e-4ebe-8641-f3b63d6485c2" name="targetframe" allowTransparency="true" scrolling="no" frameborder="0" >
        </iframe>
        <div className={classes.Icon} onClick={this.onCloseBot} >
          {icon}
        </div>
      </Aux>
    );
  }
}


export default Home;