import React from 'react';
import Rating from './Search/Rating';

const MovieModal = (props) =>{
  const language = { en: 'English', zh: 'Chinese'};
  const months = ['None', 'Ja', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const setDate = (str) =>{
    if(str){
      const strArr = str.split('-')
    return months[Number(strArr[1])]+' '+strArr[2]+', '+strArr[0];
    }
    else return 'No Release Date';
  }

  let displayImg = <div className="movie-modal-img" style={{background: 'black'}} ></div>;

  if(props.movie.backdrop_path===null) displayImg = <div className="movie-modal-img" style={{background: 'black'}} ></div>;
  else displayImg = <div className="movie-modal-img" style={{backgroundImage: `url("https://www.themoviedb.org/t/p/w220_and_h330_face${props.movie.backdrop_path}")`}} ></div>;

  return <div className="movie-modal">
      {displayImg}
      <div className="movie-modal-detail">
        <h3>Title: {props.movie.title}</h3>
        <div><b>Original Title: </b>: {props.movie.original_title} </div>
        <div><b>Release Date: </b>: {setDate(props.movie.release_date)}</div>
        <div><b>Original Language: </b>: {language[props.movie.original_language]}</div>
        <div><b>Overview</b>: {props.movie.overview}</div>
      </div>
    </div>;
};

export default MovieModal;