import React from 'react';

import classes from './Button.css';

const button = (props) => {
  return (
    <div className={classes.Button}>
      <button onClick={props.onClick} name={props.name}>{props.children}</button>
    </div>
  );
}

export default button;