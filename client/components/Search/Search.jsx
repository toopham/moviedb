/**
 * ************************************
 *
 * @module  Search
 * @author Tu Pham
 * @date 1-3-2022
 * @description Search component to make API calls and get results
 * ************************************
 */


import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import Modal from '../Modal';
import Error from './Error';
import axios from 'axios';

const Search =  (props) => {

  //use SearchParams to get all params from URL
  const [searchParams, setSearchParams] = useSearchParams();
  let query = '';
  if(searchParams.get("query")) query = searchParams.get("query").replace(' ','+');
  const sortBy = searchParams.get("sortby");
  const orderBy = searchParams.get("order");
  let page = 1;
  if(searchParams.get("page")) page = Number(searchParams.get("page"));

  //store search Results in results
  const [results, setResults ] = useState({movies: {results: [], total_results: -1}});

  //errorTrigger is use to store any error from server
  const [errorTrigger, setError] = useState(false);

  //trigger to turn modal on and off with modal information
  const [modal, setModal] = useState([false, {}]);


  //make API call when there is a change in query, page, sortyBy, or orderBy
  useEffect(() => {
    setResults({movies: {results: [], total_results: -1}});

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


  const searchResults = (<>
    <SearchFilter query={query} />
    <SearchResults results={results} 
      page={page} 
      query={query} 
      searchParams={searchParams} 
      setSearchParams={setSearchParams} 
      setModal={setModal}
    />
    <Modal modal={modal} setModal={setModal}/></>);

	return <div className="search">{errorTrigger? <Error />: searchResults}</div>;

};


export default Search;