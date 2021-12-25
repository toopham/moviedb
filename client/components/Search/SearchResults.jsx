import React, { useEffect } from 'react';
import MoviePlacard from './MoviePlacard';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';

const SearchResults = (props) => {
  const location = useLocation();
  const movies = [];
  const tvs = [];
  let showMovies = true;


  props.results.movies.results.forEach(movie =>{
    movies.push(<MoviePlacard key={movie.id} id={movie.id} img={movie.poster_path} title={movie.title} date={movie.release_date} detail={movie.overview} rate={movie.vote_average} movie={movie} />);
  })

  props.results.tv.results.forEach(tvShow =>{
    tvs.push(<MoviePlacard key={tvShow.id} id={tvShow.id} img={tvShow.poster_path} title={tvShow.name} date={tvShow.first_air_date} detail={tvShow.overview} rate={tvShow.vote_average} tvShow={tvShow} />);
  })

  let totalPages = 0;

  if(location.pathname==='/search' || location.pathname ==='/search/movie'){
    showMovies = true;
    totalPages = props.results.movies.total_pages;
  }
  else if(location.pathname==='/search/tv'){
    showMovies = false;
    totalPages = props.results.tv.total_pages;
  }

  return <div className="search-results">
    {showMovies? movies:tvs}
    <Pagination page={props.page} totalPages={totalPages} setPage={props.setPage} query={props.query} setSearchParams={props.setSearchParams}/>
  </div>;
};

export default SearchResults;