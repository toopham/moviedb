const searchController = {};
const API_KEY = require('../../secret.js');
const axios = require('axios');

searchController.search = async (req, res, next) => {
  console.log('REQ BODY : ' , req.query.query)
  const search = req.query.query.replace(' ', '+');
  const page = req.query.page;
  console.log('SEARCH : ', search);

  res.locals.results = {};
  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      console.log('MOVIES : ', data);
      res.locals.results.movies = data;
    })
    .catch(err => next(err));
  
  await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&page=${page}&query=${search}`)
    .then(res => res.data)
    .then(data => {
      console.log('TV: ', data);
      res.locals.results.tv = data;
    })
    .catch(err => next(err));
  
  return next();
};

module.exports = searchController;