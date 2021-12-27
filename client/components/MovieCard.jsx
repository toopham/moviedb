import React from 'react';

const MovieCard = (props) => {
  const months = ['None', 'Ja', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const setDate = (str) =>{
    const strArr = str.split('-')
    return months[Number(strArr[1])]+' '+strArr[2]+', '+strArr[0];
  }

  return (<div className="movie-card">
    <div className="movie-poster" style={{backgroundImage: `url("https://www.themoviedb.org/t/p/w220_and_h330_face/${props.img}")`}}></div>
      <div className="movie-detail">
        <h3>{props.title}</h3>
        <h4>{setDate(props.date)}</h4>
      </div>
    </div>);

};

export default MovieCard;