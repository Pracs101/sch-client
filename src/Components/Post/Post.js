import React from 'react';

import classes from './Post.css';

const post = (props) => {
    return (
        <div className={classes.Post} >
            <div className={classes.Header}><h1>{props.title} </h1><small>{props.date}</small> </div>
            <p>{props.children}</p>
        </div> 
    );
}

export default post;