import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainSearch = (props) => {
  const navigate = useNavigate();

  const Search = () => {
    const searchInput = document.getElementById('mainSearchBarInput');
    
    console.log('Value of search is : ', searchInput.value);
    navigate("/search?query="+searchInput.value, { replace: true});

  }

  const enterSearch = (e) =>{
    if(e.key === 'Enter') Search();
  }

  return <div className="mainSearch">
    <h1>Welcome.</h1>
    <h2>This is a replica of themoviedb.org </h2>
    <div id="mainSearchBar" ><input type="text" id="mainSearchBarInput" placeholder="Search for a movie, tv show, person......" onKeyUp={(e) => enterSearch(e)} /> 
    <button id="searchButton" onClick={() => Search()}>Search</button></div>
  </div>
};


export default MainSearch;