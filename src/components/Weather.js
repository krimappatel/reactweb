import React from 'react'

function Weather({weather}) {
  return (
    <>
        <div key={weather.id}>
            <p>Mostly: {weather.main}</p>
            <p>Description: {weather.description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="nodata"/>
        </div>
    </>
      
  )
}

export default Weather
