/**
 * ************************************
 *
 * @module  Main
 * @author Tu Pham
 * @date 1-3-2022
 * @description MovieModal component to display detailed information within the Modal component about the movie when Modal is triggered
 * ************************************
 */

import React from 'react';
import {setDate} from '../constants/date';

const MovieModal = (props) =>{

  //language const to convert server lang data into readable data
  const language = { en: 'English', zh: 'Chinese'};



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