import React from 'react'
import {useEffect,useState,useContext} from 'react'
import { getWeather } from './Api';

function Weather({latlon}) {
    const[weather,setWeather]=useState([])
    const[weatherloader,setWeatherloader]=useState(true)
     
     useEffect(()=>{
       (async()=>{
        setWeatherloader(true)
        if(latlon.lat && latlon.lon){
            const weather=await getWeather(latlon)
            setWeather(weather)
            setWeatherloader(false)
            
        }  
       })();
         
     },[latlon])

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
