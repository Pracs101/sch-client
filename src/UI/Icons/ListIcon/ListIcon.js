import React from 'react';

import { IoIosList } from "react-icons/io";
import classes from './ListIcon.module.css';

const listIcon = (props) => {
  return (
    <div className = {classes.mainDiv}>
      <IoIosList />
    </div>
  );
}

export default listIcon;