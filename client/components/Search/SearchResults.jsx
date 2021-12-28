import React, { useEffect } from 'react';
import MoviePlacard from './MoviePlacard';
import Pagination from './Pagination';
import Loading from './Loading';

const SearchResults = (props) => {

  const movies = [];

  props.results.movies.results.forEach(movie =>{
    if(movie) movies.push(<MoviePlacard setModal={props.setModal} key={movie.id} id={movie.id} movie={movie} />);
  })

  let totalPages = 0;
  totalPages = props.results.movies.total_pages;

  return <div className="search-results">
    {movies.length>=1? movies: <Loading />}
    <Pagination page={props.page} totalPages={totalPages} setPage={props.setPage} query={props.query} searchParams={props.searchParams} setSearchParams={props.setSearchParams}/>
  </div>;
};

export default SearchResults;