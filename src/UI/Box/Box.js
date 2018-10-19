import React from 'react';

import classes from './Box.css';

const box = (props) => {
  let style;
  if(props.width && props.height) {
    style = {
      width: props.width,
      height: props.height
    }
  } else {
    style = {
      width: "400px",
      height: "550px"
    }
  }
  if(props.textAlign) {
    style.textAlign = props.textAlign;
  }
  return <div style={style} className={classes.Container} >{props.children}</div>
}

export default box;