import React from 'react';
import {useSearchParams} from 'react-router-dom';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';


const Search = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();


	return <div className="search">BODY OF SEARCH WITH QUERY : {searchParams.get("query")} 
  <SearchFilter />
  <SearchResults query={searchParams.get("query")}/>
  </div>
};


export default Search;