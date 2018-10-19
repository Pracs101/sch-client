import React from 'react';

import Box from '../../../../UI/Box/Box';

const question = (props) => {
    let ren = null;
    ren = (
        <Box textAlign="left"  height="200px" width="80%" >
            <h1>{props.title}</h1>
            <small>{props.date}  </small>
            <small>---{props.by}</small>
            <p>{props.body}</p>
        </Box> 
    );
    return ren;
}

export default question;