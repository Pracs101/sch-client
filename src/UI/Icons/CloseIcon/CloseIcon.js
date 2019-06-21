import React from 'react';

import { IoIosCloseCircleOutline } from "react-icons/io";
import classes from './CloseIcons.module.css';

const closeIcon = (props) => {
  return (
    <div className = {classes.mainDiv}>
      <IoIosCloseCircleOutline />
    </div>
  );
}

export default closeIcon;