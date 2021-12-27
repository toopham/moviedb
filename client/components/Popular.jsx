import React, { useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

const Popular = (props) => {
  const [popular, setPopular] = useState([]);
  const movieCards =[]
  popular.forEach(movie => {
      movieCards.push(<MovieCard key={movie.title} title={movie.title} rate={movie.vote_average} img={movie.poster_path} date={movie.release_date} />);
  });

  useEffect(()=>{
    axios.get('./api/popular')
    .then(res => res.data)
    .then(data => {
      setPopular(data.results);
      console.log('DATA : ', data.results);
    })
    .catch(err => console.log('ERROR: ', err));
  }, []);

  return <div className="popular">
    {movieCards}
  </div>;
};

export default Popular;