import React, {Component} from 'react';
import moment from 'moment';

import Post from '../Post/Post';
import axios from '../../Axios';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Aux from '../../HOC/Auxx/Auxx';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Wall.css';
import AddPost from '../Admin/AddPost/AddPost';


class Wall extends Component {
  state = {
    loading: true,
    posts: null,
    deleted: false,
    adding: false
  }

  componentDidMount() {
    this.fecthPosts();
  }

  fecthPosts = () => {
    this.setState({loading: true});
    axios.get('/wall/' + this.props.dept)
      .then(res => {
        if(!res) {
          throw new Error('No posts');
        }
        console.log(res.data.walls);
        
        this.setState({ loading: false, posts: res.data.walls })
      })
      .catch(e => {
        this.setState({ loading: false });
        console.log(e);
      });
  }

  onDeleteHandler = (e, id) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.delete('/wall/' + id )
      .then(res => {
        // console.log(res.data);
        this.setState({loading: false, deleted: true});
        this.fecthPosts();
      })
      .catch(e => {
        this.setState({loading: false, deleted: false});
      });
  }

  onClickedHandler = (e) => {
    e.preventDefault();
    this.setState({ adding: true });
    // this.props.history.push('/admin/addpost');
  }
  back = () => {
    this.setState({ adding: false });
    this.fecthPosts();
  }

  render() {
    // let posts = this.state.error ? <p>Posts can't be loaded!</p> : <Spinner />;
    let date;
    let ren = null;
    let posts = null;
    const dept = localStorage.getItem('dept');
    if (this.state.loading) {
        posts = <Spinner />;
    }
    if(this.state.adding) {
      ren = <AddPost isWall url="/wall" back={this.back} />;
    } else {
      if(this.state.posts) {
        if(this.props.isWall) {
          posts = this.state.posts.map(post => {
            date = moment(post.createdAt).format('D/MM/YYYY h:mm A');
            return (<Post key={post._id} title={post.title} date={date} >
              {post.text}
              <form method="POST" onSubmit={(e) => this.onDeleteHandler(e, post._id)}>
                <Button>Delete</Button>
              </form>
            </Post>)
          });
        } else {
          posts = this.state.posts.map(post => {
            date = moment(post.createdAt).format('D/MM/YYYY h:mm A');
            return <Post key={post._id} title={post.title} date={date} >{post.text}</Post>
          });
        }
      }
      
      if (!this.state.loading && this.state.posts.length < 1) {
        posts = 
        <div>
          <h1 style={{
              color: '#F44336',
              textAlign: 'center'
            }}>No Notices!</h1>
          <div style={{
              height: '360px'
          }}></div>
        </div>
      }
    
      if(this.props.isWall) {
        ren = (
          <Aux>
            <div className={classes.Button}>
              <form method="POST" onSubmit={(e) => this.onClickedHandler(e)}>
                <Button>Add Post</Button>
              </form>
            </div>
            {posts}
          </Aux>
        );
      } else {
        ren = (
          <Aux>
            <h1 style={{
              textAlign: 'center',
              textTransform: 'capitalize',
              paddingTop: '20px'
            }}>{dept} Engineering</h1>
            <hr width="50%"></hr>
            {posts}
          </Aux>
        );
      }
    }
    return ren;
  }
}


export default withErrorHandler(withRouter(Wall), axios);