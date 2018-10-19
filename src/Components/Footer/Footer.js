import React from 'react';

import classes from './Footer.css';

const footer = () => {
  return (
    <footer className={classes.Footer} >
      <p>&copy; Copyright 2018 </p>
      <p>Contact information: <a href="localhost:3000">https://www.connect.com</a>.</p>
    </footer>
  );
};

export default footer;