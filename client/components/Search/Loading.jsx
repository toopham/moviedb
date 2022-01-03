import React from 'react';
import gif from '../../assets/loading.gif';

const Loading = (props) =>{

  return <div className="loading-card">
      <h3>Searching & Loading Results</h3>
      <h4>Please be patient.</h4>
      <img src={gif} />
    </div>;
};

export default Loading;