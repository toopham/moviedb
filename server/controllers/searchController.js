const searchController = {};
const API_KEY = require('../../secret.js');
const axios = require('axios');

//Search for movies with no sorting
searchController.search = async (req, res, next) => {
  const search = req.query.query.replace(' ', '+');
  const page = req.query.page;

  res.locals.results = {};
  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      res.locals.results.movies = data;
    })
    .catch(err => next(err));
  
  return next();
};

//Get back list of popular movies with page 1
searchController.popular = async (req, res, next) => {

  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`)
    .then(res => res.data)
    .then(data => {
      res.locals.popular = data;
    })
    .catch(err => next(err));
  
  return next();
};

//Search for movies with sorting. This middleware will retrieve the initial search first page
searchController.searchSort = async (req, res, next) => {
  const search = req.query.query.replace(' ', '+');
  const page = req.query.page;

  res.locals.results = {};

  //get the initial search page 1
  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      res.locals.results.movies = data;
    })
    .catch(err => next(err));

  return next();
};

//middleware to sort the movies retrieved from all the search pages from movieDB API
searchController.sort = async (req, res, next) => {
  const search = req.query.query.replace(' ', '+');
  const sortBy = req.query.sortby;
  const orderBy = req.query.order;

  //set the total pages from search results
  const totalMoviesPages = res.locals.results.movies.total_pages;

  //retrieve all search results from all the pages
  if(totalMoviesPages>1){
    for(let i = 2; i <= totalMoviesPages; i++){
      await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${i}&query=${search}`)
        .then(res => res.data)
        .then(data => res.locals.results.movies.results = res.locals.results.movies.results.concat(...data.results))
        .catch(err => next(err));
    }
  }

  //sort by name/title
  if(sortBy === 'name' && res.locals.results.movies.results.length > 1){
    res.locals.results.movies.results.sort((a,b) =>  {
      var nameA = a.title.toUpperCase(); // ignore upper and lowercase
      var nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        if(orderBy === 'asc') return -1;
        else return 1;
      }
      if (nameA > nameB) {
        if(orderBy === 'asc') return 1;
        else return -1;
      }
      // names must be equal
      return 0;
    });
  }
  //sort by rating
  else if(sortBy === 'rating' && res.locals.results.movies.results.length > 1){
    res.locals.results.movies.results.sort((a,b) => {
      if(orderBy === 'asc') return a.vote_average-b.vote_average;
      else return b.vote_average-a.vote_average;
    });
  }


  return next();
};

//compute for the items to return back given the page
searchController.page = (req, res, next) => {
  const page = req.query.page;
  //calculate the first and last item in the page
  const start = 20*(page-1);
  let end = 20*page-1;

  //if it is the last page then we need to adjust for last item because there might not be 20 items in last page
  if(Number(page) === res.locals.results.movies.total_pages) end = res.locals.results.movies.total_results-1;

  //push all the items into pageResult to send back to client
  let pageResult = [];
  for(let i = start; i<= end; i++){
    pageResult.push(res.locals.results.movies.results[i]);
  }
  res.locals.results.movies.results = pageResult;
  res.locals.results.movies.page = page;

  return next();
};

module.exports = searchController;