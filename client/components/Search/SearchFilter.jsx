import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchFilter = (props) => {
  const location = useLocation();

  let categories = <ul></ul>;
  if(location.pathname==='/search' || location.pathname ==='/search/movie'){
    categories = <ul><li className="activeCat"><Link to={`./movie?query=${props.query}`} >Movies</Link></li><li><Link to={`./tv?query=${props.query}`} >TV Shows</Link></li></ul>;
  }
  else if(location.pathname==='/search/tv'){
    categories = <ul><li><Link to={`./movie?query=${props.query}`} >Movies</Link></li><li className="activeCat"><Link to={`./tv?query=${props.query}`} >TV Shows</Link></li></ul>;
  }


  return <div className="search-filter">
    <div className="search-filter-header">Search Results</div>
      <div className="search-filter-categories">
        <div className="filter-header">CATEGORIES</div>
        {categories}
      </div>
    </div>;
};

export default SearchFilter;