/**
 * ************************************
 *
 * @module  Search
 * @author Tu Pham
 * @date 1-3-2022
 * @description Loading component when fetching asynchronous call and waiting for reponse.
 *
 * ************************************
 */

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