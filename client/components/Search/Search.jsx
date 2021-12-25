import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import axios from 'axios';

const Search =  (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query").replace(' ','+');
  let page = 1;
  if(searchParams.get("page")) page = Number(searchParams.get("page"));
  const [results, setResults ] = useState({movies: {results: []}, tv: {results: []}});

  useEffect(() => {
    axios.get('/api/search?page='+page+'&query='+query)
      .then(res => res.data)
      .then(data => setResults(data))
      .catch(err => console.log('ERROR: ', err));
  }, [query, page]);

	return <div className="search">
  <SearchFilter query={query} />
  <SearchResults results={results} page={page} query={query} setSearchParams={setSearchParams} />
  </div>
};


export default Search;