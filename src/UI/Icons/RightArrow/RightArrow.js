import React from 'react';

import classes from './RightArrow.module.css';
import { IoMdArrowDropright } from "react-icons/io";

const rightArrow = (props) => {
  return (
    <div onClick={props.onClick} className={classes.mainDiv}>
      <IoMdArrowDropright />
    </div>
  );
}

export default rightArrow;