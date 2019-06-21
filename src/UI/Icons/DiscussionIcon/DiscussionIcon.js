import React from 'react';

import { IoIosChatbubbles } from "react-icons/io";
import classes from './DiscussionIcon.module.css';

const discussionIcon = (props) => {
  return (
    <div className = {classes.mainDiv}>
      <IoIosChatbubbles />
    </div>
  );
}

export default discussionIcon;