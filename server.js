const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

let app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Under maintenance'
  })
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(3000);