import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios';
import {Spinner} from 'react-bootstrap'
import Weather from './Weather';

function SearchCity(props) {
    const[city,setCities]=useState([])
    const[searchcity,setSearchcity]=useState('')
    const [currcity,setCurrcity]=useState('')
    const[loader,setLoader]=useState(false)
    const[latlon,setLatlon]=useState([])
    const {currcun}=props

    useEffect(()=>{
        if (currcun){
            const url=`https://countriesnow.space/api/v0.1/countries/cities`;
             axios.post(url,{"country":currcun})
            .then(res=>res.data)
            .then(data=>setCities(data.data))  
             setLoader(true)   
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
    <>
    {loader ? 
      <div className="md-form mt-5">
             <input className="form-control" value={searchcity} onChange={handlercity} type="text" placeholder="Search by city" aria-label="Search"/>
      </div>
        :<Spinner animation="border" variant="secondary" />
        }  
    {!currcity ? searchcity.length != 0 &&
        <div className='list-data'>
                {city.map((list,i)=><div key={i} className="list" onClick={()=>handlercitysugg(list)}><p>{list}</p></div>)}
        </div>
        :''}
     {currcity ? <Weather currcity={currcity} latlon={latlon}/>: ' '}
    </>
  )
}

export default SearchCity
