const express = require('express');
const app = express();
const path = require('path');
const searchController = require('./controllers/searchController');

app.use(express.json());

//Use to display bundled react app
app.use('/', express.static(path.resolve(__dirname, '../dist/')));

//initial search with no sorting
app.get('/api/search', searchController.search, (req, res) => res.status(200).json(res.locals.results));

//search with sorting
app.get('/api/searchsort', searchController.searchSort, searchController.sort, searchController.page , (req, res) => res.status(200).json(res.locals.results));

//get back 1st page of popular movies
app.get('/api/popular', searchController.popular, (req, res) => res.status(200).json(res.locals.popular));

//Error Catching from Middleware
app.use((req,res) => res.status(404).jason('CANNOT FIND PAGE'));
app.use( (err, req, res, next) => {
	return res.redirect(500,'/');
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/
