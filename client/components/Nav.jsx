/**
 * ************************************
 *
 * @module  Main
 * @author Tu Pham
 * @date 1-3-2022
 * @description Static Nav inside header to replicate themoviedb.org
 * ************************************
 */

import React from 'react';

const Nav = (props) => {

  return <nav>
      <ul>
        <li>Movies</li>
        <li>TV Shows</li>
        <li>People</li>
        <li>More</li>
      </ul>
    </nav>;
}

export default Nav;