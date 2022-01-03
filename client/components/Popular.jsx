import React, { useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import Modal from './Modal';
import axios from 'axios';


const Popular = (props) => {
  const [popular, setPopular] = useState([]);
  const [modal, setModal] = useState([false, {}]);
  const [errTrigger, setError] = useState(false);
  const [order , setOrder] = useState('asc');
  const movieCards =[];
  const errorMessage = 'Server Error: Cannot retrieve popular movies.';

  popular.forEach(movie => {
      movieCards.push(<MovieCard key={movie.title} title={movie.title} rate={movie.vote_average} img={movie.poster_path} date={movie.release_date} movie={movie} setModal={setModal} />);
  });


  //SORTING OPTIONS FOR POPULAR MOVIES
  const sortByName = ()=> {
    const sortPopular = [...popular];
    sortPopular.sort((a,b) =>  {
      var nameA = a.title.toUpperCase(); // ignore upper and lowercase
      var nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        if(order === 'asc') return -1;
        else return 1;
      }
      if (nameA > nameB) {
        if(order === 'asc') return 1;
        else return -1;
      }
      // names must be equal
      return 0;
    });
    
    setPopular(sortPopular);
    if(order === 'desc') setOrder('asc');
    else setOrder('desc');
  }

  const sortByRating = ()=> {
    const sortPopular = [...popular];
    sortPopular.sort((a,b) => {
      if(order === 'asc') return a.vote_average-b.vote_average;
      else return b.vote_average-a.vote_average;
    });
    
    setPopular(sortPopular);
    if(order === 'desc') setOrder('asc');
    else setOrder('desc');
  }

  const sortOptions =<div className="sort-options">
    <button onClick={()=> sortByName()}>Sort by name</button>
    <button onClick={() => sortByRating()}>Sort by rating</button></div>;

  useEffect(()=>{
    axios.get('./api/popular')
    .then(res => res.data)
    .then(data => setPopular(data.results))
    .catch(err => setError(true));
  }, []);

  return <div className="popular-wrapper">
    <div className="popular">
      {errTrigger? errorMessage:movieCards}
      <Modal modal={modal} setModal={setModal} />
    </div>
    {errTrigger? '':sortOptions}
  </div>;
};

export default Popular;