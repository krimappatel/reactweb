import React from 'react'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios';
import context from './Context'
import { getWeather } from './Api';

function Weather(props) {
    const{latLon}=useContext(context)
    const[weather,setWeather]=useState([])
    const[weatherloader,setWeatherloader]=useState(true)
     
     useEffect(()=>{
       (async()=>{
        setWeatherloader(true)
        if(latLon.lat && latLon.lon){
            const weather=await getWeather(latLon)
            setWeather(weather)
            setWeatherloader(false)
            
        }  
       })();
         
     },[latLon])

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
