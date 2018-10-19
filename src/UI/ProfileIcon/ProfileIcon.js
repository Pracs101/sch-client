import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

import classes from './ProfileIcon.css';

const profileIcon = () => {
    return (
        <div className={classes.ProfileIcon}>
            <FaUserCircle />
        </div>
    );
}

export default profileIcon;