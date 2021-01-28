// const forecast = require("../../src/utils/forecast")

const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const massageOne = document.querySelector('#message-1')
const massageTwo = document.querySelector('#message-2')

massageOne.textContent = 'Server answer will be here: '

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  fetch('http://localhost:3000/weather?location=' + location)
  .then(response => response.json())
  .then(data => {
    massageOne.textContent = 'Server answer: '

    if (data.error) {
      massageTwo.textContent = 'Error: ' + data.error
    } else {
      massageTwo.textContent = 'In ' + data.location + ' temperature: ' + data.forecast.temperature + ', but  it feels like ' + data.forecast.feels_like
    }    
  })
})