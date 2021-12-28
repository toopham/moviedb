import React from 'react';
import Rating from './Search/Rating';

const MovieCard = (props) => {
  const months = ['None', 'Ja', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const setDate = (str) =>{
    const strArr = str.split('-')
    return months[Number(strArr[1])]+' '+strArr[2]+', '+strArr[0];
  }

  return (<div className="movie-card" onClick={() => props.setModal([true,props.movie])}>
    <div className="movie-poster" style={{backgroundImage: `url("https://www.themoviedb.org/t/p/w220_and_h330_face/${props.img}")`}}></div>
      <div className="movie-detail">
        <h3>{props.title}</h3>
        <h4>{setDate(props.date)}</h4>
        <div className="rating-div">Rating : {Number(props.movie.vote_average)*10}%</div>
      </div>
    </div>);

};

export default MovieCard;