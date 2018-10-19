import React from 'react';

import ConnectLogo from '../../assets/images/ConnectLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={ConnectLogo} alt="MyConnect" />
    </div>
);

export default logo;