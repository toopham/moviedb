import React from 'react';
import gif from '../../assets/loading.gif';

const Error = (props) =>{

  return <div className="error-card">
      <h3>Cannot connect to server API</h3>
      <h4>Please try again later.</h4>
      <img src={gif} />
    </div>;
};

export default Error;