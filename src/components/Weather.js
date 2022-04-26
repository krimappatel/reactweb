import React from 'react'
import {useEffect,useState,useContext} from 'react'
import axios from 'axios';
import context from './Context'

function Weather(props) {
    const{latLon}=useContext(context)
    const[weather,setWeather]=useState([])
    const[weatherloader,setWeatherloader]=useState(true)
     
     useEffect(()=>{
         setWeatherloader(true)
        if(latLon.lat && latLon.lon){
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=254fe8952ba6d135cd7dc4baee714199`;
            axios.get(url)
            .then(res=>res.data)
            .then(data=>setWeather(data.weather[0]))
            setWeatherloader(false)
            
        }  
     },[latLon])

  return (
    <>
        <div key={weather.id}>
            <p>Mostly: {weather.main}</p>
            <p>Description: {weather.description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="nodata"/>
        </div>
    </>
      
  )
}

export default Weather
