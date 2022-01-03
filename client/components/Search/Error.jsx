/**
 * ************************************
 *
 * @module  Search
 * @author Tu Pham
 * @date 1-3-2022
 * @description Error component to load when cannot connect to API
 *
 * ************************************
 */

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