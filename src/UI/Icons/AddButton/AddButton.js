import React from 'react';

import classes from './AddButton.module.css';
import { IoIosAddCircle } from "react-icons/io";

const addButton = (props) => {
  return (
    <div onClick={props.onClick} className={classes.mainDiv}>
      <IoIosAddCircle />
    </div>
  );
}

export default addButton;