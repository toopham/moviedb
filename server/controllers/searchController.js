const searchController = {};
const API_KEY = require('../../secret.js');
const axios = require('axios');

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
  
  await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&page=${page}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      res.locals.results.tv = data;
    })
    .catch(err => next(err));
  
  return next();
};

searchController.popular = async (req, res, next) => {

  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`)
    .then(res => res.data)
    .then(data => {
      res.locals.popular = data;
    })
    .catch(err => next(err));
  
  return next();
};

searchController.searchSort = async (req, res, next) => {
  const search = req.query.query.replace(' ', '+');
  const page = req.query.page;

  res.locals.results = {};
  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      res.locals.results.movies = data;
    })
    .catch(err => next(err));

  
  return next();
};

searchController.sort = async (req, res, next) => {
  const search = req.query.query.replace(' ', '+');
  const sortBy = req.query.sortby;
  const orderBy = req.query.order;


  const totalMoviesPages = res.locals.results.movies.total_pages;

  for(let i = 2; i <= totalMoviesPages; i++){
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${i}&query=${search}`)
      .then(res => res.data)
      .then(data => {
        res.locals.results.movies.results = res.locals.results.movies.results.concat(...data.results);
      })
      .catch(err => next(err));
    console.log('FINISHED PAGE : ', i);
  }

  //sort by name/title
  if(sortBy === 'name'){
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
  else if(sortBy === 'rating'){
    res.locals.results.movies.results.sort((a,b) => {
      if(orderBy === 'asc') return a.vote_average-b.vote_average;
      else return b.vote_average-a.vote_average;
    });
  }



  return next();
};


searchController.page = (req, res, next) => {
  const page = req.query.page;

  const start = 20*(page-1)+1;
  const end = 20*page;

  console.log('start: ',start);
  console.log('end:', end);

  let pageResult = [];

  console.log('LENGTH OF RESULTS : ' , res.locals.results.movies.results.length);

  for(let i = start; i<= end; i++){
    pageResult.push(res.locals.results.movies.results[i]);
  }
  res.locals.results.movies.results = pageResult;
  res.locals.results.movies.page = page;

  return next();
};

module.exports = searchController;