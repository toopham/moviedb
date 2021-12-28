import React from 'react';
import Rating from './Rating';

const MoviePlacard = (props) =>{
  const months = ['None', 'Ja', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const setDate = (str) =>{
    if(str){
      const strArr = str.split('-')
    return months[Number(strArr[1])]+' '+strArr[2]+', '+strArr[0];
    }
    else return 'No Release Date';
  }

  let displayImg = <div className="movie-placard-img" style={{background: 'black'}} ></div>;

  if(props.movie.poster_path===null) displayImg = <div className="movie-placard-img" style={{background: 'black'}} ></div>;
  else displayImg = <div className="movie-placard-img" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w94_and_h141_bestv2${props.movie.poster_path}")`}} ></div>;

  return <div className="movie-placard" onClick={()=>props.setModal([true, props.movie])}>
    {displayImg}
    <div className="movie-placard-detail"><h3>{props.movie.title}</h3><h4>{setDate(props.movie.release_date)}</h4>
    <p>{props.movie.overview}</p></div>
    <Rating rate={Number(props.movie.vote_average)*10} />
  </div>;
};

export default MoviePlacard;