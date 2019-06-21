import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let style = {};
  if(props.height) style.height = props.height;
  if(props.width) style.width = props.width;
  return (
    <div className={classes.Input}>
      <input style={style} type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} minLength={props.minLength} maxLength={props.maxLength} required={props.required} autoComplete="off"/>
    </div>
  );
}

export default input;