import React from 'react';
import {Link} from 'react-router-dom';

const Pagination = (props) => {

  const pages = [];
  for(let i = 1; i <= props.totalPages; i++){
    if(i==props.page) pages.push(<div className="page-button-active" key = {i} onClick={() => changePage(i)}>{i}</div>);
    else pages.push(<Link to={`?page=${i}&query=${props.query}`} key={i}><div className="page-button" key = {i}>{i}</div></Link>);

    if(props.totalPages > 10 && i===7){
      i = props.totalPages - 2;
      pages.push('...');
    } 
  }

  const prevPage = <Link to={`?page=${props.page-1}&query=${props.query}`} key='prev'><div className="page-button" >Prev</div></Link>;
  const nextPage = <Link to={`?page=${props.page+1}&query=${props.query}`} key='next'><div className="page-button" >Next</div></Link>;

  return <div className="search-footer"><div className="page-bar">
    {props.page > 1? prevPage: []}
    {pages}
    {props.page < props.totalPages? nextPage: []}
  </div></div>;
};

export default Pagination;