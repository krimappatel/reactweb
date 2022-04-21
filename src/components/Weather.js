import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios';
import {Spinner} from 'react-bootstrap'

function Weather(props) {
    const[lat,setLat]=useState(null)
    const[lon,setLon] = useState(null)
    const[weather,setWeather]=useState([])
    const[loader,setLoader]=useState(false)
    const {currcity,latlon}=props
    
     useEffect(()=>{
        if(latlon){
            latlon && latlon.map(data=>{
                setLat(data.lat)
                setLon(data.lon)
            })
         }      
     },[latlon])
     useEffect(()=>{
        if(lat && lon){
            console.log(lat,lon)
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=254fe8952ba6d135cd7dc4baee714199`;
            axios.get(url)
            .then(res=>res.data)
            .then(data=>setWeather(data.weather))
            setLoader(true)
            //  weath=weather.map((data,i)=>{return data.main})
            console.log(weather)
        }  
     },[lat])
  return (
    <>
     {loader ? weather.map((data)=>
            <div key={data.id}>
                <p>Mostly: {data.main}</p>
                <p>Description: {data.description}</p>
                <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="nodata"/>
            </div>
        ): <div className='spinner'><Spinner animation="border" variant="secondary" /></div>}
    </>
      
  )
}

export default Weather
