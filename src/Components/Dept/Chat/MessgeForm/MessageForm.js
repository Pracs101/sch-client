import React from 'react';

import classes from './MessageForm.css';

const messageForm = (props) => {
  return (
    <div className={classes.Input}>
      <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} minLength={props.minLength} maxLength={props.maxLength} required={props.required} autoComplete="off" />
    </div>
  );
}

export default messageForm;