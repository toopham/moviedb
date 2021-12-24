const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.resolve(__dirname, '../dist/')));

app.use('/api', res.status(200).json({message: 'SUCCESSFULLY CALLED API'}));