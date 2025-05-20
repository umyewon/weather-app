import React from 'react'

const WeatherBox = ({weather}) => {
    console.log('weather name : ', weather?.name);
  return (
    <div className="weather-box weather-font">
        <h3 style={{'fontWeight':'bold', 'color' : 'black'}}>{weather?.name}</h3> {/* ==  <div>{weather && weather.name}</div> */}
        <h2 style={{'fontWeight':'bold'}}>
            <span>
            {Math.floor(weather?.main.temp)}°C 
            </span>
            &nbsp; / &nbsp;
            <span>
             {Math.floor((weather?.main.temp) * 9/5) + 32}°F
            </span>
            </h2>
        <p>
            <span style={{'color' : '#ed1616'}}>
            최고 : {Math.floor(weather?.main.temp_max)}°C  
            </span>
            &nbsp; | &nbsp; 
            <span style={{'color' : '#216ede'}}>
            최저 : {Math.floor(weather?.main.temp_min)}°C 
            </span>
            </p>
        <img width="150" src={"https://openweathermap.org/img/wn/" + weather?.weather[0].icon + "@2x.png"}></img>
        <p style={{'color' : '#108bb2'}}>{weather?.weather[0].description} </p>
    </div>
  )
}

export default WeatherBox