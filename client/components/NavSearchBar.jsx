import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams} from 'react-router-dom';

const NavSearchBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const clearSearch = () =>{
    const searchBar = document.getElementById('navSearchBarInput');
    searchBar.value = '';
  };

  const enterSearch = (e) =>{
    const searchBar = document.getElementById('navSearchBarInput');
    if(e.key === 'Enter') navigate("/search?query="+searchBar.value, { replace: true});
  }

  //Display the query in the NavSearchBar if the route is search
  useEffect(()=> {
    if(location.pathname === '/search'){
      const searchInput = document.getElementById('navSearchBarInput');
      searchInput.value = searchParams.get("query");
    }
  }, [location.pathname]);


  return <div className="nav-search-bar">
      <div className="nav-search-bar-handle"><i className="bi bi-search"></i></div>
      <input type='text' id="navSearchBarInput" autoFocus onKeyUp={(e) => enterSearch(e)} />
      <i className="bi bi-x-lg" onClick={() => clearSearch()}></i>
    </div>;
}

export default NavSearchBar;