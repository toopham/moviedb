const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.resolve(__dirname, '../dist/')));

app.use('/api', (req, res) => res.status(200).json({message: 'SUCCESSFULLY CALLED API'}));

app.use('/api/test', (req, res) => res.status(200).json({message: 'SUCCESSFULLY CALLED API'}));


app.listen(3000); //listens on port 3000 -> http://localhost:3000/
