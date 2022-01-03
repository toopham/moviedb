/**
 * ************************************
 *
 * @module  Main
 * @author Tu Pham
 * @date 1-3-2022
 * @description Main component
 * ************************************
 */

import React from 'react';
import MainSearch from './MainSearch';
import Popular from './Popular';


const Main = (props) => {

	return <div className="main">
      <MainSearch />
      <Popular />
    </div>;
};


export default Main;