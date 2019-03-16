import React from 'react';

import module from './Sch.css';

const sch = (props) => {
  return (
    <div className={module.Sch} >
      {props.category}
      {props.schName}
    </div>
  );
}

export default sch;