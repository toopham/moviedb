/**
 * ************************************
 *
 * @module  Main
 * @author Tu Pham
 * @date 1-3-2022
 * @description MovieCard in Popular component to display all popular movies
 * ************************************
 */

import React from 'react';
import {setDate} from '../constants/date';

const MovieCard = (props) => {


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