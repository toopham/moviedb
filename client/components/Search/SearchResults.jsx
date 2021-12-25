import React from 'react';
import MoviePlacard from './MoviePlacard';

const SearchResults = (props) => {

  const movies = [];
  const tvs = [];


  props.results.movies.results.forEach(movie =>{
    movies.push(<MoviePlacard key={movie.id} id={movie.id} img={movie.poster_path} title={movie.title} date={movie.release_date} detail={movie.overview} />);
  })

  props.results.tv.results.forEach(tvShow =>{
    tvs.push(<MoviePlacard key={tvShow.id} id={tvShow.id} img={tvShow.poster_path} title={tvShow.name} date={tvShow.first_air_date} detail={tvShow.overview} />);
  })


  return <div className="search-results">
    {movies}
  </div>;
};

export default SearchResults;