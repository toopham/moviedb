import React from 'react';
import gif from '../../assets/loading.gif';

const Loading = (props) =>{
  const displayImg = <div className="movie-placard-img" style={{background: 'black'}} ></div>;

  return <div className="loading-card">
    <h3>...Sorting & Loading Results</h3>
    <h4>Please be patient.</h4>
    <img src={gif} />
    </div>;
};

export default Loading;