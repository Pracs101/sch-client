import React from 'react';

import classes from './Select.css';

const selectC = (props) => {
  return (
    <div className={classes.Select}>
      <select value={props.value} onChange={props.onChange} name={props.name} required={props.required}>
        {props.children}
      </select>
    </div>
  );
}

export default selectC;