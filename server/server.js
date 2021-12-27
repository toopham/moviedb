const express = require('express');
const app = express();
const path = require('path');
const searchController = require('./controllers/searchController');

app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../dist/')));

app.get('/api/search', searchController.search, (req, res) => res.status(200).json(res.locals.results));

app.get('/api/searchsort', searchController.searchSort, searchController.sort, searchController.page , (req, res) => res.status(200).json(res.locals.results));

app.get('/api/popular', searchController.popular, (req, res) => res.status(200).json(res.locals.popular));



app.use('/api/test', (req, res) => res.status(200).json({message: 'SUCCESSFULLY CALLED API'}));



app.listen(3000); //listens on port 3000 -> http://localhost:3000/
