const express = require('express');
const parser = require('body-parser');

const app = express();

const mime = require('mime');

const path = require('path');


app.use('/', express.static('dist', {maxAge: 1}));
app.use('/user', express.static('dist', {maxAge: 1})); //
app.use('/play', express.static('dist', {maxAge: 1})); //
app.use('/scores', express.static('dist', {maxAge: 1})); //
app.use('/rules', express.static('dist', {maxAge: 1})); //
app.use('/profile', express.static('dist', {maxAge: 1})); //
app.use('/about', express.static('dist', {maxAge: 1}));


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
