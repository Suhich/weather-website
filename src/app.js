const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Epress config: Handlebars & View directory
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath)) //Define main page

app.get('',(req,res) => {
  res.render('index', {
    title: 'Weather',
    forecast: -2
  })
})

app.get('/about',(req,res) => {
  res.render('about', {
    title: 'Contact information',
    author: 'Mike',
    image: 'author.jpg'
  })
})

app.get('/help',(req,res) => {
  res.render('help', {
    title: 'helping our users'
  })
})

app.get('/weather', (req, res) => {
  //Error: empty GET
  if (!req.query.location) {
    return res.send({
      error: 'U must define location GET'
    })
  }

  //Getting cods of entered place and find forecast for now
  geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error: 'Can`t connect to geocode server'
      })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Can`t connect to forecast server'
        })
      }

      res.send({
        adress: req.query.location,
        location,
        forecast: forecastData
      })
    })
  })

  
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'U must define search GET'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (eq,res) => {
  res.render('404',{
    message: 'No information about this topic'
  })
})

app.get('*', (eq,res) => {
  res.render('404',{
    message: 'Page does not found'
  })
})

app.listen(3000, () => {
  console.log('Port 3000.')
})