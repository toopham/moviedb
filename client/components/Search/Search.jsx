import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import axios from 'axios';

const Search =  (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query").replace(' ','+');

  const [results, setResults ] = useState({movies: {results: []}, tv: {results: []}});

  useEffect(() => {
    axios.get('/api/search?query='+query)
      .then(res => res.data)
      .then(data => setResults(data))
      .catch(err => console.log('ERROR: ', err));
  }, [query]);

	return <div className="search">
  <SearchFilter />
  <SearchResults results={results}/>
  </div>
};


export default Search;