import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import NavSearch from './NavSearch';
import NavSearchBar from './NavSearchBar';
import {useLocation, Link} from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();

  const [searchBar, setSearchBar] = useState(false);

  //Display NavSearchBar if the route is search
  useEffect(()=> {
    if(location.pathname === '/search'){
      setSearchBar(true);
    }
  }, [location.pathname]);

  let navSearchBar = '';

  if(searchBar) navSearchBar=<NavSearchBar />;


	return <div className="footer">
    <h3>Author: Tu Pham</h3>

    <p>Disclaimer: This website is a personal project to try to replicate the design and implementation of themoviedb.org</p>
    </div>;
};


export default Header;