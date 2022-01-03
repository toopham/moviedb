import React, { useState } from 'react';


const NavSearch = (props) => {

  let icon = <i className="bi bi-search"></i>;

  if(props.searchBar){
    icon = <i className="bi bi-x-lg"></i>;
  }

  const toggleSearch = () =>{
    props.setSearchBar(!props.searchBar);
  };

  return <div className="nav-search">
      <div onClick={() => toggleSearch()}>{icon}</div>
    </div>;
}

export default NavSearch;