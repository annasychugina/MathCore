const express = require('express');
const parser = require('body-parser');

const app = express();
// const technoDoc = require('techno-gendoc');

const mime = require('mime');

const path = require('path');

//technoDoc.generate(require('./api'), 'dist');


app.use('/', express.static('dist', {maxAge: 1}));
app.use('/user', express.static('dist', {maxAge: 1})); //
app.use('/play', express.static('dist', {maxAge: 1})); //
app.use('/scores', express.static('dist', {maxAge: 1})); //
app.use('/rules', express.static('dist', {maxAge: 1})); //
app.use('/profile', express.static('dist', {maxAge: 1})); //
app.use('/about', express.static('dist', {maxAge: 1}));


// app.use('/dist', express.static('dist'));

mime.define({
    'application/babylon': ['babylon',],
    'application/fx': ['fx',],
    'application/babylonmeshdata': ['babylonmeshdata',],
});

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.listen(process.env.PORT || 3001, () => {
    console.log(mime.lookup('cosmo.babylon'));
    console.log(`App started on port ${process.env.PORT || 3001}`);
});
