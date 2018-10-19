import React from 'react';

import DjLogo from '../../../assets/images/DjLogo.png';
import classes from './DjLogo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={DjLogo} alt="MyDjLogo" />
    </div>
);

export default logo;