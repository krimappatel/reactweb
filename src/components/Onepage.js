import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from "react-js-loader";
import {Spinner} from 'react-bootstrap'

function Onepage() {
    const {getCode}=require('country-list')
    const [Data,setData]=useState([])
    const [currcity,setCurrcity]=useState('')
    const [currcun,setCurrcun]=useState('')
    const[searchval,setSearchval]=useState('')
    const[suggestions,setSuggestions]=useState([])
    const[city,setCities]=useState([])
    const[searchcity,setSearchcity]=useState('')
    const[latlon,setLatlon]=useState([])
    const[lat,setLat]=useState(null)
    const[lon,setLon] = useState(null)
    const[weather,setWeather]=useState([])
    const[loader,setLoader]=useState(false)

    useEffect(()=>{
        if(!Data){
            <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"spinner-circle"} color={'#FFFFFF'} size={100} />
        }
         const url=`https://countriesnow.space/api/v0.1/countries/iso`;
         axios.get(url)
        .then(res=>res.data)
        .then(data=>setData(data.data))
         setLoader(true);

        // const res=getApi()
        // console.log(res.data.data)
        // if(res.data.data){
        //     setData(res.data.data)
        //     console.log(Data)
        // }
    },[])
    useEffect(()=>{
        if (currcun){
            if(city.length==0){
                // <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"spinner-circle"} color={'#FFFFFF'} size={1000} />
                <Spinner animation="border" variant="primary" />
                console.log("loading")
            }
            const url=`https://countriesnow.space/api/v0.1/countries/cities`;
             axios.post(url,{"country":currcun})
            .then(res=>res.data)
            .then(data=>setCities(data.data))     
        }   
     },[currcun])
     useEffect(()=>{
        if (currcity){
            const url=`http://api.openweathermap.org/geo/1.0/direct?q=${currcity}&limit=1&appid=254fe8952ba6d135cd7dc4baee714199`;
            axios.get(url)
            .then(res=>res.data)
            .then(data=>setLatlon(data))  

        }
     },[currcity])
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
            //  weath=weather.map((data,i)=>{return data.main})
            console.log(weather)
        }  
     },[lat])
    const handlerchange=(e)=>{
       let search=e.target.value
       setSearchval(search)
       let matches= []
           matches=Data.filter(data=>
            {
                const regx=new RegExp(`${search}`,"gi")
                return data.name.match(regx)

    })
    search ? setSuggestions(matches):setSuggestions([])
}
    const handlersuggestion=(val)=>{
        setSearchval(val)
        setSuggestions([])
        setCurrcun(val)
    }
    
    const handlercity=(e)=>{
        const cities=e.target.value;
        setSearchcity(cities)
        let matches= []
            matches= city.filter(data=> {
                const regx=new RegExp(`${cities}`,"gi")
                return data.match(regx)
            })
        // console.log(matches)
        cities.length != 0 ? setCities(matches) : setCities([])
    }
    const handlercitysugg=(val)=>{
        setSearchcity(val)
        setCities([])
        setCurrcity(val)
    }
   
  return (
    <div className='weather-box'>
        <h3>Weather Info.</h3>
        <div className="md-form mt-5 searchInputs">
             <input className="form-control" type="text" value={searchval} onChange={handlerchange} placeholder="Search by country" aria-label="Search"/>
        </div>
        {loader ? suggestions.length != 0 &&
        <div className='list-data'>
                {suggestions.map((data,i)=>
                <div key={i} className='list' onClick={()=>handlersuggestion(data.name)}>
                    <p>{data.name}</p>
                </div>
            )}
        </div>
        :
            <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"spinner-circle"} color={'#FFFFFF'} size={100} />
        }
        {/* <SearchCountry/> */}
        <div className="md-form mt-5">
             <input className="form-control" value={searchcity} onChange={handlercity} type="text" placeholder="Search by city" aria-label="Search"/>
        </div>
        { !currcity ? searchcity.length != 0 &&
        <div className='list-data'>
                {city.map((list,i)=><div key={i} className="list" onClick={()=>handlercitysugg(list)}><p>{list}</p></div>)}
        </div>
        :''} 
         {currcity.length != 0 ? weather.length != 0 && weather.map((data)=>
            <div key={data.id}>
                <p>Mostly: {data.main}</p>
                <p>Description: {data.description}</p>
                <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="nodata"/>
            </div>
        ):''}
     
    </div>


  )
}

export default Onepage;
