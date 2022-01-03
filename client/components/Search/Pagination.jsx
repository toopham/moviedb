import React from 'react';
import { Link } from 'react-router-dom';


const Pagination = (props) => {

  const sortby = props.searchParams.get('sortby');
  const orderby = props.searchParams.get('order');

  const pages = [];
  for(let i = 1; i <= props.totalPages; i++){
    if(i==props.page) pages.push(<div className="page-button-active" key = {i} onClick={() => changePage(i)}>{i}</div>);
    else{
      if(sortby) pages.push(<Link to={`?query=${props.query}&sortby=${sortby}&order=${orderby}&page=${i}`} key={i}><div className="page-button" key = {i}>{i}</div></Link>);
      else pages.push(<Link to={`?query=${props.query}&page=${i}`} key={i}><div className="page-button" key = {i}>{i}</div></Link>);
    } 

    if(props.totalPages > 10 && i===7){
      i = props.totalPages - 2;
      pages.push('...');
    } 
  }

  let prevPage = <Link to={`?query=${props.query}&page=${props.page-1}`} key='prev'><div className="page-button" >Prev</div></Link>;
  let nextPage = <Link to={`?query=${props.query}&page=${props.page+1}`} key='next'><div className="page-button" >Next</div></Link>;

  //If there is sorting then
  if(props.searchParams.get('sortby')){
    prevPage = <Link to={`?query=${props.query}&sortby=${sortby}&order=${orderby}&page=${props.page-1}`} key='prev'><div className="page-button" >Prev</div></Link>;
    nextPage = <Link to={`?query=${props.query}&sortby=${sortby}&order=${orderby}&page=${props.page+1}`} key='next'><div className="page-button" >Next</div></Link>;
  }

  return <div className="search-footer">
      <div className="page-bar">
        {props.page > 1? prevPage: []}
        {pages}
        {props.page < props.totalPages? nextPage: []}
      </div>
    </div>;
};

export default Pagination;