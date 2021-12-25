import React from 'react';


const MoviePlacard = (props) =>{
  return <div className="movie-placard">
    <div className="movie-placard-img" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w94_and_h141_bestv2${props.img}")`}} ></div>
    <div className="movie-placard-detail"><h3>{props.title}</h3><h4>{props.date}</h4><p>{props.detail}</p></div>
  </div>;
};

export default MoviePlacard;