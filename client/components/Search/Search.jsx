import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import Modal from '../Modal';
import Error from './Error';
import axios from 'axios';

const Search =  (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query").replace(' ','+');
  const sortBy = searchParams.get("sortby");
  const orderBy = searchParams.get("order");
  let page = 1;
  if(searchParams.get("page")) page = Number(searchParams.get("page"));


  const [results, setResults ] = useState({movies: {results: [], }, total_results: -1});
  const [errorTrigger, setError] = useState(false);
  const [modal, setModal] = useState([false, {}]);

  useEffect(() => {
    setResults({movies: {results: []}});

    if(searchParams.get("sortby")){
      axios.get('/api/searchsort?sortby='+sortBy+'&order='+orderBy+'&page='+page+'&query='+query)
      .then(res => res.data)
      .then(data => setResults(data))
      .catch(err => {
        setError(true); 
        console.log('ERROR : ', err);
      });
    }
    else{
      axios.get('/api/search?page='+page+'&query='+query)
      .then(res => res.data)
      .then(data => setResults(data))
      .catch(err => {
        setError(true); 
        console.log('ERROR : ', err);
      });
    }

  }, [query, page, sortBy, orderBy]);

  const error = <Error />;
  const searchResults = (<><SearchFilter query={query} />
  <SearchResults results={results} page={page} query={query} searchParams={searchParams} setSearchParams={setSearchParams} setModal={setModal} /><Modal modal={modal} setModal={setModal}/></>);

	return <div className="search">{errorTrigger? error: searchResults}</div>;

};


export default Search;