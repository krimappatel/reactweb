import React,{useEffect,useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Spinner} from 'react-bootstrap'
import Stack from "@mui/material/Stack";
import axios from 'axios'
import Weather from './Weather';

function City(props) {
    const [currcity,setCurrcity]=useState('');
    const [cities,setCities]=useState([]);
    const [latlon,setLatlon]=useState(null);
    const[loader,setLoader]=useState(false)
    const {currcou}=props;

    useEffect(()=>{
        if (currcou){
            const url=`https://countriesnow.space/api/v0.1/countries/cities`;
             axios.post(url,{"country":currcou})
            .then(res=>res.data)
            .then(data=>setCities(data.data))  
             setLoader(true)   
        }   
     },[currcou])
     useEffect(()=>{
        if (currcity){
            const url=`http://api.openweathermap.org/geo/1.0/direct?q=${currcity}&limit=1&appid=254fe8952ba6d135cd7dc4baee714199`;
            axios.get(url)
            .then(res=>res.data)
            .then(data=>setLatlon(data))  

        }
     },[currcity])
  return (
    <>
        {loader ?
            <Stack sx={{width:"auto",mt:6}}>
                <Autocomplete
                    id="combo-box-demo"
                    options={cities}
                    getOptionLabel={(option)=>{ return option}}
                    onChange={(event,value)=>{setCurrcity(value);}}
                    sx={{width:"inherit",bgcolor:'white'}}
                    renderInput={(params) => <TextField sx={{color:'white'}} {...params} placeholder="Search By City" />}
                />
                {currcity?<Weather currcity={currcity} latlon={latlon}/>:''}
            </Stack>
            :<div className='spinner'><Spinner  animation="border" variant="secondary"/></div>}
    </>
  )
}

export default City
