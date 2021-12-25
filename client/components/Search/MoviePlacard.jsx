import React from 'react';
import Rating from './Rating';

const MoviePlacard = (props) =>{

  let displayImg = <div className="movie-placard-img" style={{background: 'black'}} ></div>;

  if(props.img===null) displayImg = <div className="movie-placard-img" style={{background: 'black'}} ></div>;
  else displayImg = <div className="movie-placard-img" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w94_and_h141_bestv2${props.img}")`}} ></div>;

  return <div className="movie-placard">
    {displayImg}
    <div className="movie-placard-detail"><h3>{props.title}</h3><h4>{props.date}</h4>
    <p>{props.detail}</p></div>
    <Rating rate={Number(props.rate)*10} />
  </div>;
};

export default MoviePlacard;