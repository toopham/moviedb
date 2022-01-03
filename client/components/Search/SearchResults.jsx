/**
 * ************************************
 *
 * @module  Search
 * @author Tu Pham
 * @date 1-3-2022
 * @description SearchResults component to display all the results
 * ************************************
 */

import React from 'react';
import MoviePlacard from './MoviePlacard';
import Pagination from './Pagination';
import Loading from './Loading';

const SearchResults = (props) => {

  //store all movie results in movie array
  const movies = [];
  props.results.movies.results.forEach(movie =>{
    if(movie) movies.push(<MoviePlacard setModal={props.setModal} key={movie.id} id={movie.id} movie={movie} />);
  })


  const noresults = <div className="no-results">NO MATCH FOUND FOR : {props.query.replace('+',' ')}</div>;

  return <div className="search-results">
      {props.results.movies.total_results>0? movies: props.results.movies.total_results===0? noresults: <Loading />}
      <Pagination page={props.page} 
          totalPages={props.results.movies.total_pages} 
          setPage={props.setPage} 
          query={props.query} 
          searchParams={props.searchParams} 
          setSearchParams={props.setSearchParams}
        />
    </div>;
};

export default SearchResults;