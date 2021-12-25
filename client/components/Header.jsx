import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import NavSearch from './NavSearch';
import NavSearchBar from './NavSearchBar';
import {useLocation} from 'react-router-dom';

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


	return <div className="header"><div className="navbar"><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="MovieDB" className="logo-img" />
    <Nav />
    <NavSearch searchBar={searchBar} setSearchBar={setSearchBar} />
    {navSearchBar}
    </div></div>;
};


export default Header;