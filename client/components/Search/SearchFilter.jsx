import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchFilter = (props) => {


  let sort= <ul><li><Link to={`./?query=${props.query}&sortby=name&order=asc`} >By Title - ASC</Link></li>
    <li><Link to={`./?query=${props.query}&sortby=name&order=desc`} >By Title - DESC</Link></li>
    <li><Link to={`./?query=${props.query}&sortby=rating&order=asc`} >By Rating - ASC</Link></li>
    <li><Link to={`./?query=${props.query}&sortby=rating&order=desc`} >By Rating - DESC</Link></li>
    </ul>;


  return <div className="search-filter">
    <div className="search-filter-header">Search Results</div>
      <div className="search-filter-categories">
        <div className="filter-header">Movies</div>
        {sort}
      </div>
    </div>;
};

export default SearchFilter;