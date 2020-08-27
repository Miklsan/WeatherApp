"use strict"

const api = {
    key: "5bccb8f84d1d7a7203b970fa09e99e2b",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', setQuery)
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value)
        console.log(searchBox.value)
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults)
}
function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now)

    //réfléchir pour ajouter l'heure locale api heure mondiale

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let weather_el = document.querySelector('.current .weather')
    weather_el.innerText = weather.weather[0].main

    let hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°c`
}
function dateBuilder(d) {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Samedi"]


    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}