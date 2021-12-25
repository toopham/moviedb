import React from 'react';
import "./stylesheets/style.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Search from './components/Search/Search';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const App = (props) => {

  return (<Router>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search/*" element={<Search />} />
    </Routes>
    <Footer />
    </Router>);
}

export default App;