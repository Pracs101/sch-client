import React, { Component } from 'react';

import classes from './Sch.css';
import RightArrow from '../../../UI/Icons/RightArrow/RightArrow';
import DownArrow from '../../../UI/Icons/DownArrow/DownArrow';
import UpArrow from '../../../UI/Icons/UpArrow/UpArrow';
import Speech from 'react-speech';

class Sch extends Component {
  state = {
    view: false
  }

  viewData = () => {
    this.setState({view: !this.state.view})
    console.log(this.state.view);
  }

  render () {
    let ren = null;
    let show = null;
    let givenDownArrow = null;
    let givenUpArrow = null;
    givenDownArrow = (
        <div className={classes.mainDiv}>
          <div className={classes.subDiv} onClick={this.viewData}>
          {/* <Speech
            stop={true} 
            pause={true} 
            resume={true} 
            text="I am displaying all buttons" /> */}
            <div className={classes.arrow}><RightArrow /></div>
            <div className={classes.scholarName}>{this.props.schName}</div>
            <div className={classes.downArrow}><DownArrow /></div>
          </div>
        </div>
    );

    givenUpArrow = (
      <div className={classes.mainDiv}>
        <div className={classes.subDiv} onClick={this.viewData}>
          <div className={classes.arrow}><RightArrow /></div>
          <div className={classes.scholarName}>{this.props.schName}</div>
          <div className={classes.downArrow}><UpArrow /></div>
        </div>
      </div>
  );

    show = (
      <div className={classes.Sch}>
        <div className={classes.subSch}>
          <div className={classes.title}>Category</div>
          <div className={classes.body}>{this.props.category}</div>
        </div>
        <div className={classes.subSch}>
          <div className={classes.title}>Overview</div>
          <div className={classes.body}>{this.props.overview}</div>
        </div>
        <div className={classes.subSch}>
          <div className={classes.title}>Criteria</div>
          <div className={classes.body}>{this.props.criteria.map((e, i)=>{
            return (
              <ul>
                <li>{e}</li>
              </ul>  
            );
          })}</div>
        </div>
        <div className={classes.subSch}>
          <div className={classes.title}>Eligibility Criteria</div>
          <div className={classes.body}>{this.props.criteria}</div>
        </div>
        <div className={classes.subSch}>
          <div className={classes.title}>Documents Required</div>
          <div className={classes.body}>{this.props.docs.map((e, i)=>{
            return (
              <ul>
                <li>{e}</li>
              </ul>  
            );
          })}</div>
        </div>
        <div className={classes.subSch}>
          <div className={classes.title}>Website Link</div>
          <div className={classes.body}><a href={this.props.link} target='_' >{this.props.link}</a></div>
        </div>
      </div>
    );
    
    if(!this.state.view) {
      ren = (
        <div>
          {givenDownArrow}
        </div>
      )
    }
    else {
      ren = (
        <div>
          {givenUpArrow}
          {show}
        </div>
      )
    }

    return ren;
  }
}

export default Sch;